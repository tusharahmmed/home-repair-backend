import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { PortfolioController } from './portfolio.controller';

const router = Router();

router.post(
  '/create',
  // validateRequest(ServiceValidation.createService),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  FileUploadHelper.upload.single('file'),
  PortfolioController.insertIntoDb
);

router.get('/:categoryId/category', PortfolioController.getDocumentByCategory);

router.patch(
  '/:id',
  //   validateRequest(ServiceValidation.updateServie),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  FileUploadHelper.upload.single('file'),
  PortfolioController.updateDocumentById
);

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  PortfolioController.deleteDocumentById
);

router.get('/:id', PortfolioController.getDocumentById);

router.get('/', PortfolioController.getAllDocument);

export const PortfolioRoutes = router;
