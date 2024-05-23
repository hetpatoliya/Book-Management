import express from 'express';
import { AuthorController } from '../controllers/author.controller';
import authanticateAdmin from '../middleware/authAdmin'

const authorController = new AuthorController();
const router = express.Router();

router.post('/admin/author/createauthor', authanticateAdmin, authorController.createAuthor);
router.get('/admin/author/getallauthors', authanticateAdmin, authorController.getAllAuthors);
router.patch('/admin/author/updateauthor/:authorId', authanticateAdmin, authorController.updateAuthor);
router.delete('/admin/author/deleteauthor/:authorId', authanticateAdmin, authorController.deleteAuthor);
router.get('/admin/author/getallauthorspeginated', authanticateAdmin, authorController.getAllAuthorsPaginated);

export default router;