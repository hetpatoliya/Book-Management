import { Request, Response } from "express";
import { IRequestExtended } from '../interfaces/Other';
import { BookService } from "../services/book.service";
import { constants } from "../utils/constants";
import { controller, httpGet, httpPatch, httpDelete, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import authenticateAdmin from "../middleware/authAdmin";

@controller('/admin/book', authenticateAdmin)
export class BookController {

    constructor(@inject(BookService) public bookService: BookService) { }

    @httpPost('/addBook')
    public async addBook(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await this.bookService.addBook(req.body, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpGet('/getAllBooks')
    public async retrieveBook(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.bookService.retrieveBook();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpPatch('/updateBook/:bookId')
    public async updateBook(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const bookId = req.params.bookId;
            const data = await this.bookService.updateBook(req.body, bookId, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpDelete('/deleteBook/:bookId')
    public async deleteBook(req: Request, res: Response) {
        try {
            const bookId = req.params.bookId;
            const data = await this.bookService.deleteBook(bookId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpGet('/getAllBooksPeginated')
    public async getAllBooksPaginated(req: Request, res: Response): Promise<void> {
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

            const data = await this.bookService.getAllBooksPaginated(parsedPage, parsedLimit, searchQuery as string, parsedFilters);

            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}