import { FastifyReply, FastifyRequest } from 'fastify';

export const registerUserHandler = (request: FastifyRequest, reply: FastifyReply) => {
	return { status: 'OK' };
};
