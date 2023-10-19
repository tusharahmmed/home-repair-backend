'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const FileUploadHelper_1 = require('../../../helpers/FileUploadHelper');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const service_controller_1 = require('./service.controller');
const service_validation_1 = require('./service.validation');
const router = (0, express_1.Router)();
router.post(
  '/create',
  // validateRequest(ServiceValidation.createService),
  (0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin),
  FileUploadHelper_1.FileUploadHelper.upload.single('file'),
  service_controller_1.BookController.insertIntoDb
);
router.get(
  '/:categoryId/category',
  service_controller_1.BookController.getDocumentByCategory
);
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    service_validation_1.ServiceValidation.updateServie
  ),
  (0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin),
  FileUploadHelper_1.FileUploadHelper.upload.single('file'),
  service_controller_1.BookController.updateDocumentById
);
router.delete(
  '/:id',
  (0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin),
  service_controller_1.BookController.deleteDocumentById
);
router.get('/:id', service_controller_1.BookController.getDocumentById);
router.get('/', service_controller_1.BookController.getAllDocument);
exports.ServiceRoutes = router;
