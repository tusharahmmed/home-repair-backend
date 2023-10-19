'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.applicationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const auth_route_1 = require('../modules/auth/auth.route');
const category_route_1 = require('../modules/category/category.route');
const order_route_1 = require('../modules/order/order.route');
const portfolio_route_1 = require('../modules/portfolio/portfolio.route');
const profile_route_1 = require('../modules/profile/profile.route');
const review_route_1 = require('../modules/review/review.route');
const service_route_1 = require('../modules/service/service.route');
const user_route_1 = require('../modules/user/user.route');
const router = express_1.default.Router();
const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/profile',
    route: profile_route_1.ProfileRoutes,
  },
  {
    path: '/categories',
    route: category_route_1.CategoryRoutes,
  },
  {
    path: '/services',
    route: service_route_1.ServiceRoutes,
  },
  {
    path: '/orders',
    route: order_route_1.OrderRoutes,
  },
  {
    path: '/reviews',
    route: review_route_1.ReviewRoutes,
  },
  {
    path: '/portfolios',
    route: portfolio_route_1.PortfolioRoutes,
  },
];
moduleRoutes.forEach(module => router.use(module.path, module.route));
exports.applicationRoutes = router;
