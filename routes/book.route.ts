import express from 'express';
import { bookController } from '../controllers/book.controller';
import authanticateAdmin from '../middleware/authAdmin';

const bookc = new bookController();
const router = express.Router();

router.post('/admin/book/addbook', authanticateAdmin, bookc.addBook);
router.get('/admin/book/getallbooks', authanticateAdmin, bookc.retrieveBook);
router.patch('/admin/book/updatebook/:bookId', authanticateAdmin, bookc.updateBook);
router.delete('/admin/book/deletebook/:bookId', authanticateAdmin, bookc.deleteBook);
router.get('/admin/book/getallbookspeginated', authanticateAdmin, bookc.getAllBooksPaginated);

export default router;