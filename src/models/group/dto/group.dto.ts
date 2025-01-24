
import { z } from 'zod';
import { MemberSchema } from '../../member/dto/member.dto';

const GroupSchema = z.object({
  groupId: z
    .string()
    .min(1, 'Group ID cannot be empty') 
    .uuid('Invalid groupId format, expected UUID'), 
  groupName: z
    .string()
    .min(3, 'Group name must be at least 3 characters long') 
    .max(50, 'Group name must be at most 50 characters long'),
  groupIcon: z
    .string()
    .url('Invalid URL format for groupIcon') 
    .optional(),
  groupMembers: z
    .array(MemberSchema)
    .min(1, 'There must be at least one member') 
    .max(15, 'There can be no more than 100 members in a group'),
});

export type GroupDTO = z.infer<typeof GroupSchema>;
