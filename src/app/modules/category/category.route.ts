import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.category),
  auth(USER_ROLE.admin),
  CategoryController.insertIntoDb
);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.category),
  auth(USER_ROLE.admin),
  CategoryController.updateDocumentById
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  CategoryController.deleteDocumentById
);

router.get('/:id', CategoryController.getDocumentById);

router.get('/', CategoryController.getAllDocument);

export const CategoryRoutes = router;
