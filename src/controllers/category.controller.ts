import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { IRequestExtended } from '../interfaces/Other';
import { constants } from "../utils/constants";
import { controller, httpPost, httpGet, httpDelete, httpPatch } from 'inversify-express-utils';
import { inject } from 'inversify';
import authenticateAdmin from "../middleware/authAdmin";

@controller('/admin/category', authenticateAdmin)
export class CategoryController {

    constructor(@inject(CategoryService) public categoryService: CategoryService) { }

    @httpPost('/addCategory')
    public async addCategory(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const data = await this.categoryService.addCategory(req.body, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpGet('/getAllCategory')
    public async getAllCategory(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.categoryService.getAllCategory();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpPost('/updateCategory/:categoryId')
    public async updateCategory(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const adminId = req.adminId;
            const categoryId = req.params.categoryId;
            const data = await this.categoryService.updateCategory(req.body, categoryId, adminId!);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }

    @httpDelete('/deleteCategory/:categoryId')
    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = req.params.categoryId;
            const data = await this.categoryService.deleteCategory(categoryId);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    };

    @httpGet('/getCategoriesPeginated')
    public async getAllCategoryPaginated(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const searchQuery = req.query.search as string;

            const data = await this.categoryService.getAllCategoryPaginated(page, limit, searchQuery);

            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(constants.ERROR_STATUS_CODE).json({
                status: constants.ERROR_STATUS,
                message: error.message
            });
        }
    }
}