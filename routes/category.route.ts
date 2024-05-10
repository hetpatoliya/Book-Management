import express from 'express';
import { categoryController } from '../controllers/category.controller';
import authanticateAdmin from '../middleware/authAdmin';

const router = express.Router();
const categoryc = new categoryController();

router.post('/admin/category/addcategory', authanticateAdmin,categoryc.addCategory);
router.get('/admin/catrgory/getallcategory', authanticateAdmin, categoryc.getAllCategory);
router.patch('/admin/category/updatecategory/:categoryId', authanticateAdmin, categoryc.updateCategory);
router.delete('/admin/category/deletecategory/:categoryId', authanticateAdmin, categoryc.deleteCategory);
router.get('/admin/category/getcategoriespaginated', authanticateAdmin, categoryc.getAllCategoryPaginated);

export default router;