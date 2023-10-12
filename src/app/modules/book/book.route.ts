import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBook),
  auth(USER_ROLE.admin),
  BookController.insertIntoDb
);

router.get('/:categoryId/category', BookController.getDocumentByCategory);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBook),
  auth(USER_ROLE.admin),
  BookController.updateDocumentById
);

router.delete('/:id', auth(USER_ROLE.admin), BookController.deleteDocumentById);

router.get('/:id', BookController.getDocumentById);

router.get('/', BookController.getAllDocument);

export const BookRoutes = router;
