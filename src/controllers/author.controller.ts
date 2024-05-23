import { Request, Response } from "express";
import { AuthorService } from "../services/author.service";
import { IRequestExtended } from "../interfaces/Other";
import { constants } from "../utils/constants";

const authorService = new AuthorService();

export class AuthorController {

    public async createAuthor(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await authorService.createAuthor(req.body, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const data = await authorService.getAllAuthors();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async updateAuthor(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const authorId = req.params.authorId;
            const data = await authorService.updateAuthor(req.body, authorId, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorId = req.params.authorId;
            const data = await authorService.deleteAuthor(authorId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

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
            const data = await authorService.getAllAuthorsPaginated(parsedPage, parsedLimit, searchQuery as string, parsedFilters);
            res.status(constants.SUCCESS_STATUS_CODE).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}