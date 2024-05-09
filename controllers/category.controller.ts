import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { adminIdextended } from '../interfaces/other.interface';
import { constants } from "../utils/constants";

const categorys = new categoryService();

export class categoryController {

    public async addCategory(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const { statusCode, message } = await categorys.addCategory(req.body, adminId!);
            res.status(statusCode).json({ message: message });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllCategory(req: Request, res: Response): Promise<void> {
        try {
            const { allCategories, statusCode } = await categorys.getAllCategory();
            res.status(statusCode).json({ message: allCategories });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async updateCategory(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const categoryId = req.params.categoryId;
            const { statusCode, message } = await categorys.updateCategory(req.body, categoryId, adminId!);
            res.status(statusCode).json({ message: message });
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
            const { statusCode, message } = await categorys.deleteCategory(categoryId);
            res.status(statusCode).json({ message: message });
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

            const { categories, totalCategories } = await categorys.getAllCategoryPaginated(page, limit, searchQuery);

            res.status(constants.SUCCESS_STATUS_CODE).json({ categories, totalCategories });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}