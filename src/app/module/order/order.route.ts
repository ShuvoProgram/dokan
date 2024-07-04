import { Router } from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { OrderCreateZodSchema } from './order.validation';

const router = Router();

router.post('/',
validateRequest(OrderCreateZodSchema),
OrderController.createOrder);

router.get('/:id', OrderController.getOrderById);

router.get('/', OrderController.getAllOrders);

router.put('/:id', OrderController.updateOrder);

export const OrderRoutes = router;