import Category from '../models/category.model';
import { Icategory } from '../interfaces/category.interface';
import { constants } from '../utils/constants';

export class categoryService {

    public async addCategory(category: Icategory, adminId: String): Promise<String> {
        if(!category.category){
            return constants.ENTER_VALID_VALUES;
        }                                                                                       
        const newCategory = new Category({ category: category.category, createdBy: adminId });
        await newCategory.save();
        return constants.CATEGORY_ADDED;
    }

    public async getAllCategory(): Promise<Icategory[]> {
        const categories = await Category.find();
        return categories;
    }

    public async updateCategory(category: Icategory, categoryId: String, adminId: String): Promise<String> {

        const isCategory = await Category.findOne({ _id: categoryId });

        if (!isCategory) {
            return constants.CATEGORY_NOT_EXISTS;
        }
        await Category.findOneAndUpdate({ _id: categoryId }, { $set: { category: category.category, updatedBy: adminId } }, { new: true });
        return constants.CATEGORY_UPDATED;
    }

    public async deleteCategory(categoryId: String): Promise<String> {
        const isCategory = await Category.findOne({ _id: categoryId });

        if (!isCategory) {
            return constants.CATEGORY_NOT_EXISTS;
        }
        await Category.findOneAndDelete({ _id: categoryId });
        return constants.CATEGORY_DELETED;
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