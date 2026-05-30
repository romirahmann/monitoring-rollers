import fp from "fastify-plugin";
import bcrypt from "bcrypt";

export default fp(async (fastify) => {
  fastify.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify();
    } catch (e) {
      res.code(401).send({ error: "Unauthorized" });
    }
  });

  fastify.decorate("hashPassword", async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  });

  fastify.decorate("verifyPassword", async (password, hash) => {
    return await bcrypt.compare(password, hash);
  });
});
