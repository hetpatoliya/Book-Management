import Category from '../models/category.model';
import { Icategory } from '../interfaces/category.interface';
import { constants } from '../utils/constants';

export class categoryService {

    public async addCategory(category: Icategory, adminId: String): Promise<{ statusCode: number, message: string }> {
        let statusCode: number, message: string;
        if (!category.category) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.ENTER_VALID_VALUES;
            return { statusCode, message };
        }
        const newCategory = new Category({ category: category.category, createdBy: adminId });
        await newCategory.save();
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.CATEGORY_ADDED;
        return { statusCode, message };
    }

    public async getAllCategory(): Promise<{ allCategories: Icategory[], statusCode: number }> {
        const allCategories = await Category.find();
        const statusCode: number = constants.SUCCESS_STATUS_CODE;
        return { allCategories, statusCode };
    }

    public async updateCategory(category: Icategory, categoryId: String, adminId: String): Promise<{ statusCode: number, message: string }> {

        const isCategory = await Category.findOne({ _id: categoryId });
        let statusCode: number, message: string;
        if (!isCategory) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.CATEGORY_NOT_EXISTS;
            return { statusCode, message };
        }
        await Category.findOneAndUpdate({ _id: categoryId }, { $set: { category: category.category, updatedBy: adminId } }, { new: true });
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.CATEGORY_UPDATED;
        return { statusCode, message };
    }

    public async deleteCategory(categoryId: String): Promise<{ statusCode: number, message: string }> {
        const isCategory = await Category.findOne({ _id: categoryId });
        let statusCode: number, message: string;

        if (!isCategory) {
            statusCode = constants.ERROR_STATUS_CODE;
            message = constants.CATEGORY_NOT_EXISTS;
            return { statusCode, message };
        }
        await Category.findOneAndDelete({ _id: categoryId });
        statusCode = constants.SUCCESS_STATUS_CODE;
        message = constants.CATEGORY_DELETED;
        return { statusCode, message };
    }

    public async getAllCategoryPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ categories: Icategory[], totalCategories: number }> {
        let query: any = {};

        if (searchQuery) {
            query.category = { $regex: searchQuery, $options: 'i' };
        }
        // if (filters) {
        //     if (filters.type) {
        //         query.type = filters.type;
        //     }
        // }

        const categories = await Category.find(query)
            .populate('createdBy', 'username')
            .populate('updatedBy', 'username')
            .skip((page - 1) * limit)
            .limit(limit);
        const totalCategories = await Category.countDocuments(query);

        return { categories, totalCategories };
    }
}