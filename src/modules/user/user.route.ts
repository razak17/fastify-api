import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.conntroller';
import { $ref } from './user.schema';

const userRoutes = async (server: FastifyInstance) => {
	server.post(
		'/',
		{
			schema: {
				body: $ref('createUserSchema'),
				response: {
					201: $ref('createUserResponseSchema')
				}
			}
		},
		registerUserHandler
	);
};

export default userRoutes;
