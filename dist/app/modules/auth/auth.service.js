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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const utils_1 = require('../../../shared/utils');
const signup = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // hash password
    payload.password = yield bcrypt_1.default.hash(
      payload.password,
      Number(config_1.default.bcrypt_salt_round)
    );
    const result = yield prisma_1.default.user.create({ data: payload });
    const passwordRemoved = (0, utils_1.excludeFields)(result, ['password']);
    return passwordRemoved;
  });
const signin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // find user
    const user = yield prisma_1.default.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'user not found!'
      );
    }
    // match password
    const matchedResult = yield bcrypt_1.default.compare(
      password,
      user.password
    );
    if (!matchedResult) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password does not matched'
      );
    }
    // create token
    const token = jwtHelpers_1.jwtHelpers.createToken(
      { id: user.id, role: user.role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    return token;
  });
exports.AuthService = {
  signup,
  signin,
};
