import { USER_ROLE } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrder),
  auth(USER_ROLE.customer),
  OrderController.createOrder
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.getSingleOrder
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.getAllOrders
);

export const OrderRoutes = router;
