import Fastify from 'fastify';

const fastify = Fastify({
	logger: true
});

fastify.get('/health', async (request, reply) => {
	return { status: 'OK' };
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`server listening on ${address}`);
});
