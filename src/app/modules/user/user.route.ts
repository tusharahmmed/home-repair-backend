import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUser),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.updateDocumentById
);

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.deleteDocumentById
);

router.get(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.getDocumentById
);

router.post(
  '/create',
  validateRequest(UserValidation.createUser),
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.createDocument
);
router.get(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  UserController.getAllFromDb
);

export const UserRoutes = router;
