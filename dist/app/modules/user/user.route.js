'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_controller_1 = require('./user.controller');
const user_validation_1 = require('./user.validation');
const router = (0, express_1.Router)();
router.patch(
  '/:id',
  (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser),
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  user_controller_1.UserController.updateDocumentById
);
router.delete(
  '/:id',
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  user_controller_1.UserController.deleteDocumentById
);
router.get(
  '/:id',
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  user_controller_1.UserController.getDocumentById
);
router.get(
  '/',
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  user_controller_1.UserController.getAllFromDb
);
exports.UserRoutes = router;
