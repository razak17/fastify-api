import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByEmail, findUsers } from './user.service';
import { verifyPassword } from '../../utils/hash';

export async function registerUserHandler(
	request: FastifyRequest<{ Body: Required<CreateUserInput> }>,
	reply: FastifyReply
) {
	const body = request.body;

	try {
		const user = await createUser(body);
		return reply.code(201).send(user);
	} catch (e) {
		console.log(e);
		return reply.code(500).send(e);
	}
}

export async function loginHandler(
	request: FastifyRequest<{
		Body: LoginInput;
	}>,
	reply: FastifyReply
) {
	const body = request.body;

	// find a user by email
	const user = await findUserByEmail(body.email);

	if (!user) {
		return reply.code(401).send({
			message: 'Invalid email or password'
		});
	}

	// verify password
	const comparePassword = verifyPassword({
		candidatePassword: body.password,
		salt: user.salt,
		hash: user.password
	});

	if (comparePassword) {
		/* eslint-disable-next-line no-unused-vars */
		const { password, salt, ...rest } = user;

		// generate access token
		const token = await reply.jwtSign(rest);
		return { accessToken: token };
	}

	return reply.code(401).send({
		message: 'Invalid email or password'
	});
}
export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}

