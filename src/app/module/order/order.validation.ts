import { z } from 'zod';

export const OrderCreateZodSchema = z.object({
  email: z.string().email().optional(),
  productId: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});
