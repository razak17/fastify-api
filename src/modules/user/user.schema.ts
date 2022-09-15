import { object, string, TypeOf } from 'zod';

const createUserSchema = {
	body: object({
		email: string({ required_error: 'email is required' }).email('Not a valid email'),
		name: string({ required_error: 'name is required' }).min(2, 'username must be at least 2 characters long'),
		password: string({ required_error: 'password is required' })
	})
};

export type CreateUserInput = TypeOf<typeof createUserSchema.body>;
