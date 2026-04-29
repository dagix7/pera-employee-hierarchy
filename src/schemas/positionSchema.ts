import { z } from 'zod';

export const positionSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  description: z
    .string()
    .optional()
    .or(z.literal('')),
  parentId: z
    .string()
    .uuid()
    .optional()
    .or(z.literal('')),
});

export type PositionFormData = z.infer<typeof positionSchema>;
