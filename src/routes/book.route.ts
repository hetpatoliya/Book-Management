import express from 'express';
import { BookController } from '../controllers/book.controller';
import authanticateAdmin from '../middleware/authAdmin';

const bookController = new BookController();
const router = express.Router();

router.post('/admin/book/addbook', authanticateAdmin, bookController.addBook);
router.get('/admin/book/getallbooks', authanticateAdmin, bookController.retrieveBook);
router.patch('/admin/book/updatebook/:bookId', authanticateAdmin, bookController.updateBook);
router.delete('/admin/book/deletebook/:bookId', authanticateAdmin, bookController.deleteBook);
router.get('/admin/book/getallbookspeginated', authanticateAdmin, bookController.getAllBooksPaginated);

export default router;