import fp from "fastify-plugin";
import knex from "knex";
import knexConfig from "../../knexfile.js";

export default fp(async (fastify) => {
  const db = knex(knexConfig.development);
  fastify.decorate("db", db);
  fastify.addHook("onClose", async (instance, done) => {
    await db.destroy();
    done();
  });
});
