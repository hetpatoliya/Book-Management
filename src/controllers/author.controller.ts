import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { IRequestExtended } from "../interfaces/Other";
import { constants } from "../utils/constants";
import { controller, httpPost, httpGet, httpDelete, httpPatch } from 'inversify-express-utils';
import { inject } from 'inversify';
import authenticateAdmin from "../middleware/authAdmin";

@controller('/admin/author',authenticateAdmin)
export class AuthorController {

    constructor(@inject(AuthorService) public authorService: AuthorService) { }

    @httpPost('/createAuthor')
    public async createAuthor(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await this.authorService.createAuthor(req.body, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpGet('/getAllAuthors')
    public async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.authorService.getAllAuthors();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpPatch('/updateAuthor/:authorId')
    public async updateAuthor(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const authorId = req.params.authorId;
            const data = await this.authorService.updateAuthor(req.body, authorId, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpDelete('/deleteAuthor/:authorId')
    public async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorId = req.params.authorId;
            const data = await this.authorService.deleteAuthor(authorId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpGet('/getAllAuthorsPeginated')
    public async getAllAuthorsPaginated(req: Request, res: Response): Promise<void> {
        try {
            const { page, limit, filters } = req.query;
            const parsedPage = page ? parseInt(page as string, 10) : 1;
            const parsedLimit = limit ? parseInt(limit as string, 10) : 10;
            let parsedFilters: any;
            const searchQuery = req.query.search as string;

            if (typeof filters === 'string') {
                parsedFilters = JSON.parse(filters);
            } else {
                parsedFilters = filters;
            }
            const data = await this.authorService.getAllAuthorsPaginated(parsedPage, parsedLimit, searchQuery as string, parsedFilters);
            res.status(constants.SUCCESS_STATUS_CODE).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}