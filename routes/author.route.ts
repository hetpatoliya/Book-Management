import express from 'express';
import { authorController } from '../controllers/author.controller';
import authanticateAdmin from '../middleware/authAdmin'

const authorc = new authorController();
const router = express.Router();

router.post('/admin/createauthor', authanticateAdmin, authorc.createAuthor);
router.get('/admin/getallauthors',authanticateAdmin,authorc.getAllAuthors);
router.patch('/admin/updateauthor/:authorId',authanticateAdmin,authorc.updateAuthor);
router.delete('/admin/deleteauthor/:authorId',authanticateAdmin,authorc.deleteAuthor);
router.get('/admin/getallauthorspeginated',authanticateAdmin,authorc.getAllAuthorsPaginated);

export default router;