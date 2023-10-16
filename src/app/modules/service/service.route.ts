import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(ServiceValidation.createService),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  BookController.insertIntoDb
);

router.get('/:categoryId/category', BookController.getDocumentByCategory);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.updateServie),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  BookController.updateDocumentById
);

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  BookController.deleteDocumentById
);

router.get('/:id', BookController.getDocumentById);

router.get('/', BookController.getAllDocument);

export const ServiceRoutes = router;
