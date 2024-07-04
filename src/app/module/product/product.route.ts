import { Router } from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductCreateZodSchema, ProductUpdateZodSchema } from './product.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ProductCreateZodSchema),
  ProductController.createProduct,
);
router.get('/:id', ProductController.getProductById);
router.get('/', ProductController.getAllProducts);
router.put(
  '/:id',
  validateRequest(ProductUpdateZodSchema),
  ProductController.updateProduct,
);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;