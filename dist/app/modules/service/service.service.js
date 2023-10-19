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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const service_constant_1 = require("./service.constant");
const insertIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedImage) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
    }
    const result = yield prisma_1.default.service.create({
        data: Object.assign(Object.assign({}, payload), { image: uploadedImage.secure_url }),
        include: {
            category: true,
        },
    });
    return result;
});
const getAllDocument = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { page, skip, size, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // filters
    // const { search, minPrice, maxPrice, category } = filters;
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    // generate search condition
    if (search) {
        andConditions.push({
            OR: service_constant_1.BOOK_SEARCH_FIELDS.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // generate filter condition
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (key === 'category') {
                    return {
                        categoryId: {
                            equals: filterData['category'],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.service.findMany({
        // filters
        where: whereConditions,
        // pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: size,
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.service.count({ where: whereConditions });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getDocumentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            reviewAndRatings: {
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return result;
});
const getDocumentByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination
    const { page, skip, size, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.service.findMany({
        where: {
            categoryId,
        },
        // pagination
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: size,
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.service.count({
        where: {
            categoryId,
        },
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const updateDocumentById = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceDetails = yield prisma_1.default.service.findUnique({
        where: { id },
    });
    if (file && (serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.image)) {
        const response = yield FileUploadHelper_1.FileUploadHelper.replaceImage(serviceDetails.image, file);
        if (!response) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.image = response.secure_url;
    }
    if (file && !(serviceDetails === null || serviceDetails === void 0 ? void 0 : serviceDetails.image)) {
        const uploadedImage = yield FileUploadHelper_1.FileUploadHelper.uploadToCloudinary(file);
        if (!uploadedImage) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        else {
            payload.image = uploadedImage.secure_url;
        }
    }
    const result = yield prisma_1.default.service.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return result;
});
const deleteDocumentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistHomeBanner = yield tx.service.findUnique({
            where: { id },
            select: { image: true },
        });
        if (isExistHomeBanner === null || isExistHomeBanner === void 0 ? void 0 : isExistHomeBanner.image) {
            yield FileUploadHelper_1.FileUploadHelper.destroyToCloudinary(isExistHomeBanner.image);
        }
        return tx.service.delete({
            where: { id },
        });
    }));
    return result;
});
exports.BookService = {
    insertIntoDb,
    getAllDocument,
    getDocumentById,
    getDocumentByCategory,
    updateDocumentById,
    deleteDocumentById,
};
