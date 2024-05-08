import express from 'express';
import { categoryController } from '../controllers/category.controller';
import authanticateAdmin from '../middleware/authAdmin';

const router = express.Router();
const categoryc = new categoryController();

router.post('/admin/addcategory', authanticateAdmin,categoryc.addCategory);
router.get('/admin/getallcategory', authanticateAdmin, categoryc.getAllCategory);
router.patch('/admin/updatecategory/:categoryId', authanticateAdmin, categoryc.updateCategory);
router.delete('/admin/deletecategory/:categoryId', authanticateAdmin, categoryc.deleteCategory);
router.get('/admin/getcategoriespaginated', authanticateAdmin, categoryc.getAllCategoryPaginated);

export default router;