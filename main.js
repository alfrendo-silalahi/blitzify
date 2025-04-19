import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", function (request, reply) {
  reply.send({ message: "Hello world!" });
});

fastify.get("/hello", function (request, reply) {
  reply.send({ message: "Hello Alfrendo, welcome to Fastify" });
});

fastify.get("/api/users", function (request, reply) {
  const { page, limit } = request.query;
  reply.send({ page, limit });
});

fastify.get("/api/users/:userId", function (request, reply) {
  const { userId } = request.params;
  reply.send({ userId });
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
