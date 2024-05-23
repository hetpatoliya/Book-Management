import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { IRequestExtended } from '../interfaces/Other';
import { constants } from "../utils/constants";

const categoryService = new CategoryService();

export class CategoryController {

    public async addCategory(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await categoryService.addCategory(req.body, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllCategory(req: Request, res: Response): Promise<void> {
        try {
            const data = await categoryService.getAllCategory();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async updateCategory(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const categoryId = req.params.categoryId;
            const data = await categoryService.updateCategory(req.body, categoryId, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = req.params.categoryId;
            const data = await categoryService.deleteCategory(categoryId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    };

    public async getAllCategoryPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const searchQuery = req.query.search as string;

            const data = await categoryService.getAllCategoryPaginated(page, limit, searchQuery);

            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}