import fastify from "fastify";
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";
import dbPlugin from "./plugins/db.js";
import routes from "./routes/index.js";
import cookiePlugin from "./plugins/cookie.js";

const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  },
});

app.register(cors, {
  origin: ["http://localhost:5000", "http://192.168.9.192:5000"],
  credentials: true,
});

await app.register(cookiePlugin);
await app.register(jwtPlugin);
await app.register(authPlugin);
await app.register(dbPlugin);
await app.register(routes);

app.get("/", async (request, reply) => {
  return { status: "Server is running!" };
});

export default app;
