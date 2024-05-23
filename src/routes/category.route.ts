import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import authanticateAdmin from '../middleware/authAdmin';

const router = express.Router();
const categoryController = new CategoryController();

router.post('/admin/category/addcategory', authanticateAdmin, categoryController.addCategory);
router.get('/admin/catrgory/getallcategory', authanticateAdmin, categoryController.getAllCategory);
router.patch('/admin/category/updatecategory/:categoryId', authanticateAdmin, categoryController.updateCategory);
router.delete('/admin/category/deletecategory/:categoryId', authanticateAdmin, categoryController.deleteCategory);
router.get('/admin/category/getcategoriespaginated', authanticateAdmin, categoryController.getAllCategoryPaginated);

export default router;