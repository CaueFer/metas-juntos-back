import { z } from 'zod';

const loginInUser = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .max(100, 'Email must have at most 100 characters'),
  otpCode: z.string().min(2, 'OTP Code Is Required')
});

export type LogInUserDTO = z.infer<typeof loginInUser>;