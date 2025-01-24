import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  userName: z
    .string()
    .min(5, 'Name must have at least 5 characters')
    .max(50, 'Name must have at most 50 characters'),
  userEmail: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email must have at most 100 characters'),
  userImg: z.string().url('Invalid URL format').optional().or(z.literal('')),
});

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}


export type CreateUserDTOType = z.infer<typeof CreateUserSchema>;
