import { Request, Response } from "express";
import { adminIdextended, bookIdextended } from '../interfaces/other.interface';
import { bookService } from "../services/book.service";
import { constants } from "../utils/constants";

const books = new bookService();

export class bookController {

    public async addBook(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const { statusCode, message } = await books.addBook(req.body, adminId!);
            res.status(statusCode).json({ message: message });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async retrieveBook(req: Request, res: Response): Promise<void> {
        try {
            const { allBooks, statusCode } = await books.retrieveBook();
            res.status(statusCode).json({ message: allBooks });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async updateBook(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const bookId = req.params.bookId;
            const { statusCode, message } = await books.updateBook(req.body, bookId, adminId!);
            res.status(statusCode).json({ message: message });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async deleteBook(req: Request, res: Response) {
        try {
            const bookId = req.params.bookId;
            const { statusCode, message } = await books.deleteBook(bookId!);
            res.status(statusCode).json({ message: message });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

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

            const data = await books.getAllBooksPaginated(parsedPage, parsedLimit, searchQuery as string, parsedFilters);

            res.status(constants.SUCCESS_STATUS_CODE).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}