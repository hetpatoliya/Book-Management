import express from 'express';
import { authorController } from '../controllers/author.controller';
import authanticateAdmin from '../middleware/authAdmin'

const authorc = new authorController();
const router = express.Router();

router.post('/admin/author/createauthor', authanticateAdmin, authorc.createAuthor);
router.get('/admin/author/getallauthors', authanticateAdmin, authorc.getAllAuthors);
router.patch('/admin/author/updateauthor/:authorId', authanticateAdmin, authorc.updateAuthor);
router.delete('/admin/author/deleteauthor/:authorId', authanticateAdmin, authorc.deleteAuthor);
router.get('/admin/author/getallauthorspeginated', authanticateAdmin, authorc.getAllAuthorsPaginated);

export default router;