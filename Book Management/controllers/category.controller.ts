import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { adminIdextended } from '../interfaces/other.interface';
import { constants } from "../utils/constants";

const categorys = new categoryService();

export class categoryController {

    public async addCategory(req: adminIdextended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await categorys.addCategory(req.body, adminId!);
            res.json({ message: data });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    public async getAllCategory(req: Request, res: Response): Promise<void> {
        try {
            const data = await categorys.getAllCategory();
            res.json({ message: data });
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
            const data = await categorys.updateCategory(req.body, categoryId, adminId!);
            res.json({ message: data });
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
            const data = await categorys.deleteCategory(categoryId);
            res.json({ message: data });
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
            const filters = req.query.filters;

            const { categories, totalCategories } = await categorys.getAllCategoryPaginated(page, limit, searchQuery);

            res.json({ categories, totalCategories });
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}