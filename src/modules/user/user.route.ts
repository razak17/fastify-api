import { FastifyInstance } from 'fastify';
import { registerUserHandler } from './user.conntroller';

const userRoutes = (server: FastifyInstance) => {
	server.post('/', registerUserHandler);
};

export default userRoutes;
