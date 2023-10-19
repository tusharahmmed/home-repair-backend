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
exports.ReviewService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDb = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = user.id;
    const result = yield prisma_1.default.reviewAndRating.create({
        data: payload,
    });
    return result;
});
const getAllDocument = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findMany();
    return result;
});
const getDocumentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateDocumentById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteDocumentById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === client_1.USER_ROLE.user) {
        const cursor = yield prisma_1.default.reviewAndRating.findUnique({
            where: {
                id,
            },
        });
        if ((cursor === null || cursor === void 0 ? void 0 : cursor.userId) === user.id) {
            const result = yield prisma_1.default.reviewAndRating.delete({
                where: {
                    id,
                },
            });
            return result;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden!');
        }
    }
    const result = yield prisma_1.default.reviewAndRating.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ReviewService = {
    insertIntoDb,
    getAllDocument,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById,
};
