'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const review_controller_1 = require('./review.controller');
const review_validation_1 = require('./review.validation');
const router = (0, express_1.Router)();
router.post(
  '/create',
  (0, validateRequest_1.default)(review_validation_1.ReviewValidation.create),
  (0, auth_1.default)(
    client_1.USER_ROLE.super_admin,
    client_1.USER_ROLE.admin,
    client_1.USER_ROLE.user
  ),
  review_controller_1.ReviewController.insertIntoDb
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(review_validation_1.ReviewValidation.update),
  (0, auth_1.default)(
    client_1.USER_ROLE.super_admin,
    client_1.USER_ROLE.admin,
    client_1.USER_ROLE.user
  ),
  review_controller_1.ReviewController.updateDocumentById
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    client_1.USER_ROLE.super_admin,
    client_1.USER_ROLE.admin,
    client_1.USER_ROLE.user
  ),
  review_controller_1.ReviewController.deleteDocumentById
);
router.get('/:id', review_controller_1.ReviewController.getDocumentById);
router.get('/', review_controller_1.ReviewController.getAllDocument);
exports.ReviewRoutes = router;
