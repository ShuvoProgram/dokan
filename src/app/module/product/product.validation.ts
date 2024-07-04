import { z } from 'zod';

const VariantSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
});

export const ProductCreateZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(VariantSchema).optional(),
  inventory: z.object({
    quantity: z.number(),
    inStock: z.boolean(),
  }).optional(),
});

export const ProductUpdateZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(VariantSchema).optional(),
  inventory: z
    .object({
      quantity: z.number(),
      inStock: z.boolean(),
    })
    .optional(),
});
