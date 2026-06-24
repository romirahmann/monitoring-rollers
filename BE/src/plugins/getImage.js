import fastifyStatic from "@fastify/static";
import path from "path";

export default async function (fastify) {
  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "uploads"),
    prefix: "/uploads/",
  });
}
