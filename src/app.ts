import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';

import userRoutes from './modules/user/user.route';
import productRoutes from './modules/product/product.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import { version } from '../package.json';

const server = Fastify({ logger: true });

server.register(fjwt, {
	secret: 'thequickbrownfoxjumpsoverthelazydog'
});

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		await request.jwtVerify();
	} catch (e) {
		return reply.send(e);
	}
});

server.get('/health', async () => ({ status: 'OK' }));

for (const schema of [...userSchemas, ...productSchemas]) {
	server.addSchema(schema);
}

server.register(
	swagger,
	withRefResolver({
		routePrefix: '/docs',
		exposeRoute: true,
		staticCSP: true,
		openapi: {
			info: {
				title: 'Fastify API',
				description: 'API for some products',
				version
			}
		}
	})
);

server.register(userRoutes, { prefix: '/api/users' });
server.register(productRoutes, { prefix: 'api/products' });

server.listen({ port: 3000, host: '0.0.0.0' }, function (err) {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
	// server.log.info(`server listening on ${address}`);
});
