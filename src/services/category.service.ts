import { Category } from '../models/Category';
import { ICategory } from '../interfaces/Category';
import { constants } from '../utils/constants';
import { injectable } from 'inversify';

@injectable()
export class CategoryService {

    public async addCategory(category: ICategory, adminId: String): Promise<{ statusCode: number, message: string, category?: ICategory }> {
        if (!category.category) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.ENTER_VALID_VALUES };
        }
        const newCategory = Category.create({ category: category.category, createdBy: adminId }) as unknown as ICategory;
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.CATEGORY_ADDED, category: newCategory };
    }

    public async getAllCategory(): Promise<{ allCategories: ICategory[], statusCode: number }> {
        const allCategories = await Category.find() as ICategory[];
        return { allCategories, statusCode: constants.SUCCESS_STATUS_CODE };
    }

    public async updateCategory(category: ICategory, categoryId: String, adminId: String): Promise<{ statusCode: number, message: string, category?: ICategory }> {

        const isCategory = await Category.findOne({ _id: categoryId });
        if (!isCategory) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.CATEGORY_NOT_EXISTS };
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId }, { $set: { category: category.category, updatedBy: adminId } }, { new: true }) as ICategory;
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.CATEGORY_UPDATED, category: updatedCategory };
    }

    public async deleteCategory(categoryId: String): Promise<{ statusCode: number, message: string }> {
        const isCategory = await Category.findOne({ _id: categoryId });

        if (!isCategory) {
            return { statusCode: constants.ERROR_STATUS_CODE, message: constants.CATEGORY_NOT_EXISTS };
        }
        await Category.findOneAndDelete({ _id: categoryId });
        return { statusCode: constants.SUCCESS_STATUS_CODE, message: constants.CATEGORY_DELETED };
    }

    public async getAllCategoryPaginated(page: number = 1, limit: number = 10, searchQuery?: string, filters?: any): Promise<{ statusCode: number, categories: any | ICategory[], totalCategories: number }> {
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

        return { statusCode: constants.SUCCESS_STATUS_CODE, categories, totalCategories };
    }
}