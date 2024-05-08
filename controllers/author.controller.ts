import { Request, Response } from "express";
import { authorService } from "../services/author.service";
import { adminIdextended, authorIdextended } from "../interfaces/other.interface";
import { constants } from "../utils/constants";

const authors = new authorService();

export class authorController {

    public async createAuthor(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await authors.createAuthor(req.body, adminId!);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const data = await authors.getAllAuthors();
            res.json({ message: data });
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
            const data = await authors.updateAuthor(req.body, authorId, adminId!);
            res.json({ message: data });
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
            const data = await authors.deleteAuthor(authorId);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    // public async getAllAuthorsPaginated(req: authorIdextended, res: Response): Promise<void> {
    //     try {
    //         const page = req.query.page ? parseInt(req.query.page as string) : 1;
    //         const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    //         const data = await authors.getAllAuthorsPaginated(page, limit);
    //         res.json({ message: data });
    //     } catch (error: any) {
    //         res.status(401).json({
    //             status: 'fail',
    //             message: error.message
    //         });
    //     }
    // }

    // public async searchAuthors(req: authorIdextended, res: Response): Promise<void> {
    //     try {
    //         const query = req.query.q as string;

    //         const searchResults = await authors.searchAuthors(query);
    //         res.json(searchResults);
    //     } catch (error) {
    //         res.status(401).json({
    //             status: 'fail',
    //             message: error.message
    //         });
    //     }
    // }

    // public async filterAuthors(req: authorIdextended, res: Response): Promise<void> {
    //     try {
    //         const nationality = req.query.nationality as string;
    //         const filteredAuthors = await authors.filterAuthorsByNationality(nationality);
    //         res.json(filteredAuthors);
    //     } catch (error) {
    //         res.status(401).json({
    //             status: 'fail',
    //             message: error.message
    //         });
    //     }
    // }
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
            res.json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    // public async signUpAuthor(req: Request, res: Response): Promise<any> {
    //     try {
    //         const authorId = req.params.authorId;
    //         const data = await authors.signUpAuthor(req.body, authorId);
    //         res.json({ message: data });
    //     } catch (error: any) {
    //         res.status(constants.ERROR_STATUS_CODE).json({
    //             status: constants.ERROR_STATUS,
    //             message: error.message
    //         });
    //     }
    // }
}