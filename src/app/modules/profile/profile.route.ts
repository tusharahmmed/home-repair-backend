import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';

const router = Router();

router.get(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  ProfileController.getProfile
);
router.patch(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  ProfileController.updateProfile
);

export const ProfileRoutes = router;
