import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .max(100, 'Name must not exceed 100 characters.'),

  category: z
    .string()
    .trim()
    .min(1, 'Category is required.'),

  price: z.coerce
    .number({ message: 'Price must be a valid number.' })
    .positive('Price must be greater than 0.'),

  stock: z.coerce
    .number({ message: 'Stock must be a valid number.' })
    .int('Stock must be an integer.')
    .min(0, 'Stock must be greater than or equal to 0.'),

  status: z.enum(['active', 'inactive'], {
    message: 'Status must be either active or inactive.',
  }),

  description: z
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters.')
    .optional()
    .or(z.literal('')),
});

export type ProductFormData = z.infer<typeof productSchema>;
