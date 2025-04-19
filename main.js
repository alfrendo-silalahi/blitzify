import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyMysql from "@fastify/mysql";

dotenv.config();

const fastify = Fastify({ logger: true });
fastify.register(fastifyMysql, {
  connectionString: process.env.DB_URL,
});

fastify.get("/api/users", function (request, reply) {
  fastify.mysql.query("SELECT * FROM users", function onResult(err, result) {
    reply.send(result);
  });
});

fastify.get("/api/users/:userId", function (request, reply) {
  fastify.mysql.query(
    "SELECT * FROM users WHERE id = ?",
    request.params.userId,
    function onResult(err, result) {
      reply.send(result);
    }
  );
});

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
