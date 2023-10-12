'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const category_controller_1 = require('./category.controller');
const category_validation_1 = require('./category.validation');
const router = (0, express_1.Router)();
router.post(
  '/create-category',
  (0, validateRequest_1.default)(
    category_validation_1.CategoryValidation.category
  ),
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  category_controller_1.CategoryController.insertIntoDb
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    category_validation_1.CategoryValidation.category
  ),
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  category_controller_1.CategoryController.updateDocumentById
);
router.delete(
  '/:id',
  (0, auth_1.default)(client_1.USER_ROLE.admin),
  category_controller_1.CategoryController.deleteDocumentById
);
router.get('/:id', category_controller_1.CategoryController.getDocumentById);
router.get('/', category_controller_1.CategoryController.getAllDocument);
exports.CategoryRoutes = router;
