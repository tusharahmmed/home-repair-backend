'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const order_controller_1 = require('./order.controller');
const order_validation_1 = require('./order.validation');
const router = (0, express_1.Router)();
router.post(
  '/create-order',
  (0, validateRequest_1.default)(
    order_validation_1.OrderValidation.createOrder
  ),
  (0, auth_1.default)(client_1.USER_ROLE.customer),
  order_controller_1.OrderController.createOrder
);
router.get(
  '/:id',
  (0, auth_1.default)(client_1.USER_ROLE.admin, client_1.USER_ROLE.customer),
  order_controller_1.OrderController.getSingleOrder
);
router.get(
  '/',
  (0, auth_1.default)(client_1.USER_ROLE.admin, client_1.USER_ROLE.customer),
  order_controller_1.OrderController.getAllOrders
);
exports.OrderRoutes = router;
