"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const portfolio_contant_1 = require("./portfolio.contant");
const portfolio_service_1 = require("./portfolio.service");
const insertIntoDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const file = req === null || req === void 0 ? void 0 : req.file;
    const result = yield portfolio_service_1.PortfolioService.insertIntoDb(JSON.parse(data), file);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Portfolio created successfully',
        data: result,
    });
}));
const getAllDocument = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const filters = (0, pick_1.default)(req.query, portfolio_contant_1.PORTFOLIO_FILTERS_FIELDS);
    const result = yield portfolio_service_1.PortfolioService.getAllDocument(options, filters);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Portfolio fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getDocumentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield portfolio_service_1.PortfolioService.getDocumentById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Portfolio fetched successfully',
        data: result,
    });
}));
const getDocumentByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELDS);
    const result = yield portfolio_service_1.PortfolioService.getDocumentByCategory(categoryId, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'data fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const updateDocumentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = req.body;
    const file = req === null || req === void 0 ? void 0 : req.file;
    const result = yield portfolio_service_1.PortfolioService.updateDocumentById(id, JSON.parse(data), file);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Portfolio updated successfully',
        data: result,
    });
}));
const deleteDocumentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield portfolio_service_1.PortfolioService.deleteDocumentById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Portfolio deleted successfully',
        data: result,
    });
}));
exports.PortfolioController = {
    insertIntoDb,
    getAllDocument,
    getDocumentById,
    getDocumentByCategory,
    updateDocumentById,
    deleteDocumentById,
};
