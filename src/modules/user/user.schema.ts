import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
	email: z.string({ required_error: 'email is required' }).email('Not a valid email'),
	name: z.string({ required_error: 'name is required' }).min(2, 'username must be at least 2 characters long')
};

const createUserSchema = z.object({
	...userCore,
	password: z.string({ required_error: 'password is required' })
});

const createUserResponseSchema = z.object({
	id: z.number(),
	...userCore
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
	createUserSchema,
	createUserResponseSchema
});
