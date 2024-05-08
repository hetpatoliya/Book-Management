import { Request, Response } from "express";
import { adminIdextended, bookIdextended } from '../interfaces/other.interface';
import { bookService } from "../services/book.service";
import { constants } from "../utils/constants";

const books = new bookService();

export class bookController {

    public async addBook(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await books.addBook(req.body, adminId!);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async retrieveBook(req: Request, res: Response): Promise<void> {
        try {
            const data = await books.retrieveBook();
            res.json({ message: data });
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
            const data = await books.updateBook(req.body, bookId, adminId!);
            res.json({ message: data });
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
            const data = await books.deleteBook(bookId!);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

            const data = await books.getAllBooksPaginated(page, limit);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    // public async searchBooks(req: adminIdextended, res: Response): Promise<void> {
    //     try {
    //         const bookId = req.params.bookId;
    //         const query = req.query.q as string;

    //         const searchResults = await books.searchBooks(bookId, query);
    //         res.status(200).json(searchResults);
    //     } catch (error) {
    //         res.status(401).json({
    //             status: 'fail',
    //             message: error.message
    //         });
    //     }
    // }

    // public async filterBooksByCategory(req: bookIdextended, res: Response): Promise<void> {
    //     try {
    //         const category = req.query.category as string;
    //         const filteredBooks = await books.filterBooksByCategory(category);
    //         res.json(filteredBooks);
    //     } catch (error) {
    //         res.status(401).json({
    //             status: 'fail',
    //             message: error.message
    //         });
    //     }
    // }

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

            res.json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}