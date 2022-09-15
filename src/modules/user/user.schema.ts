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

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' }).email(),
	password: z.string()
});

const loginResponseSchema = z.object({
	accessToken: z.string()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
	createUserSchema,
	loginSchema,
	loginResponseSchema,
	createUserResponseSchema
});
