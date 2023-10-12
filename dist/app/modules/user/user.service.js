'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const config_1 = __importDefault(require('../../../config'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const utils_1 = require('../../../shared/utils');
const getAllFromDb = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    const passwordRemoved = yield result.map(user => {
      return (0, utils_1.excludeFields)(user, ['password']);
    });
    return passwordRemoved;
  });
const getDocumentById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
      where: {
        id,
      },
    });
    if (result) {
      const passwordRemoved = (0, utils_1.excludeFields)(result, ['password']);
      return passwordRemoved;
    }
    return result;
  });
const updateDocumentById = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // update password
    if (payload.password) {
      payload.password = yield bcrypt_1.default.hash(
        payload.password,
        Number(config_1.default.bcrypt_salt_round)
      );
    }
    const result = yield prisma_1.default.user.update({
      where: {
        id,
      },
      data: payload,
    });
    const passwordRemoved = (0, utils_1.excludeFields)(result, ['password']);
    return passwordRemoved;
  });
const deleteDocumentById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
      where: {
        id,
      },
    });
    const passwordRemoved = (0, utils_1.excludeFields)(result, ['password']);
    return passwordRemoved;
  });
exports.UserService = {
  getAllFromDb,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
