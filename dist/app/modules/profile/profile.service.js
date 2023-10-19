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
exports.ProfileService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: user.id,
        },
    });
    const removedPassword = (0, utils_1.excludeFields)(result, ['password']);
    return removedPassword;
});
const updateProfile = (user, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield prisma_1.default.user.findUnique({
        where: { id: user.id },
    });
    // hash password
    if (payload.password) {
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_round));
    }
    // const result = await prisma.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     ...payload,
    //     profileImg: uploadedImage.secure_url as string,
    //   },
    // });
    if (file && (userDetails === null || userDetails === void 0 ? void 0 : userDetails.profileImg)) {
        const response = yield FileUploadHelper_1.FileUploadHelper.replaceImage(userDetails.profileImg, file);
        if (!response) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Image upload failed');
        }
        payload.profileImg = response.secure_url;
    }
    const result = yield prisma_1.default.user.update({
        where: { id: user.id },
        data: Object.assign({}, payload),
    });
    const removedPassword = (0, utils_1.excludeFields)(result, ['password']);
    return removedPassword;
});
exports.ProfileService = {
    getProfile,
    updateProfile,
};
