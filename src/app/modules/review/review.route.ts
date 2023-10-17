import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(ReviewValidation.create),
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  ReviewController.insertIntoDb
);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.update),
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  ReviewController.updateDocumentById
);

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  ReviewController.deleteDocumentById
);

router.get('/:id', ReviewController.getDocumentById);

router.get('/', ReviewController.getAllDocument);

export const ReviewRoutes = router;
