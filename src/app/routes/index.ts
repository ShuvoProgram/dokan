import express from 'express'
import { ProductRoutes } from '../module/product/product.route';
import { OrderRoutes } from '../module/order/order.route';

const router = express.Router()

const moduleRouter = [
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;
