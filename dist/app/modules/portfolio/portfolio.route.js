"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const portfolio_controller_1 = require("./portfolio.controller");
const router = (0, express_1.Router)();
router.post('/create', 
// validateRequest(ServiceValidation.createService),
(0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin), FileUploadHelper_1.FileUploadHelper.upload.single('file'), portfolio_controller_1.PortfolioController.insertIntoDb);
router.get('/:categoryId/category', portfolio_controller_1.PortfolioController.getDocumentByCategory);
router.patch('/:id', 
//   validateRequest(ServiceValidation.updateServie),
(0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin), FileUploadHelper_1.FileUploadHelper.upload.single('file'), portfolio_controller_1.PortfolioController.updateDocumentById);
router.delete('/:id', (0, auth_1.default)(client_1.USER_ROLE.super_admin, client_1.USER_ROLE.admin), portfolio_controller_1.PortfolioController.deleteDocumentById);
router.get('/:id', portfolio_controller_1.PortfolioController.getDocumentById);
router.get('/', portfolio_controller_1.PortfolioController.getAllDocument);
exports.PortfolioRoutes = router;
