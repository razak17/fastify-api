import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.conntroller';

const userRoutes = async (server: FastifyInstance) => {
	server.post('/', registerUserHandler);
};

export default userRoutes;
