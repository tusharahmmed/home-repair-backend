'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProfileRoutes = void 0;
const client_1 = require('@prisma/client');
const express_1 = require('express');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const profile_controller_1 = require('./profile.controller');
const router = (0, express_1.Router)();
router.get(
  '/',
  (0, auth_1.default)(client_1.USER_ROLE.admin, client_1.USER_ROLE.customer),
  profile_controller_1.ProfileController.getProfile
);
exports.ProfileRoutes = router;
