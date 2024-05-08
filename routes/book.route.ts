import express from 'express';
import { bookController } from '../controllers/book.controller';
import authanticateAdmin from '../middleware/authAdmin';

const bookc = new bookController();
const router = express.Router();

router.post('/admin/addbook', authanticateAdmin, bookc.addBook);
router.get('/admin/getallbooks', authanticateAdmin, bookc.retrieveBook);
router.patch('/admin/updatebook/:bookId', authanticateAdmin, bookc.updateBook);
router.delete('/admin/deletebook/:bookId', authanticateAdmin, bookc.deleteBook);
router.get('/admin/getallbookspeginated', authanticateAdmin, bookc.getAllBooksPaginated);

export default router;