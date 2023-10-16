import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(OrderValidation.createOrder),
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  OrderController.createOrder
);

router.get(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  OrderController.getSingleOrder
);

router.patch(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  OrderController.updateOrder
);
router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  OrderController.deleteOrder
);

router.get(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
  OrderController.getAllOrders
);

export const OrderRoutes = router;
