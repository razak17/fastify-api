import Fastify from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

const server = Fastify({ logger: true });

server.get('/health', async () => ({ status: 'OK' }));

for (const schema of [...userSchemas]) {
	server.addSchema(schema);
}

server.register(userRoutes, { prefix: '/api/users' });

server.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
	server.log.info(`server listening on ${address}`);
});
