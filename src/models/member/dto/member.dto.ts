import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const MemberSchema = z.object({
  memberId: z.string().uuid('Invalid memberId format, expected UUID'),
  memberFlag: z
    .array(z.string().min(1, 'Flags cannot be empty'))
    .default(['default'])
    .transform((flags) => flags ?? ['default']),
});

export class MemberDTO extends createZodDto(MemberSchema) {}

export type MemberDTOType = z.infer<typeof MemberSchema>;
