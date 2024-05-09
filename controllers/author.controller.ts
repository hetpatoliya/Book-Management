import { Request, Response } from "express";
import { authorService } from "../services/author.service";
import { adminIdextended, authorIdextended } from "../interfaces/other.interface";
import { constants } from "../utils/constants";

const authors = new authorService();

export class authorController {

    public async createAuthor(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const { statusCode, message } = await authors.createAuthor(req.body, adminId!);
            res.status(statusCode).json({ message: message });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const { allAuthors, statusCode } = await authors.getAllAuthors();
            res.status(statusCode).json({ message: allAuthors });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async updateAuthor(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const authorId = req.params.authorId;
            const { statusCode, message } = await authors.updateAuthor(req.body, authorId, adminId!);
            res.status(statusCode).json({ message: message });
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
            const { statusCode, message } = await authors.deleteAuthor(authorId);
            res.status(statusCode).json({ message: message });
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
            const data = await authors.getAllAuthorsPaginated(parsedPage, parsedLimit, searchQuery as string, parsedFilters);
            res.status(constants.SUCCESS_STATUS_CODE).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}