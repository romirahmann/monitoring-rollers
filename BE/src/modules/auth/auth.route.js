import { successResponse } from "../../common/response.js";
import { authMiddleware } from "../../plugins/authMiddleware.js";
import { authRepository } from "./auth.repository.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authServices } from "./auth.service.js";

export default async function (fastify) {
  const repository = authRepository(fastify.db);
  const services = authServices({ authRepository: repository, fastify });

  fastify.post("/register", async (req, res) => {
    const body = registerSchema.parse(req.body);
    const user = await services.register(body);

    return successResponse(res, {
      message: "User registered",
      data: user,
    });
  });

  fastify.post("/login", async (req, res) => {
    const body = loginSchema.parse(req.body);
    const { token, user } = await services.login(body);

    res.setCookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });

    return successResponse(res, {
      message: "User logged in",
      data: user,
    });
  });

  fastify.post("/logout", async (req, res) => {
    res.clearCookie("token").send({
      success: true,
    });
    return successResponse(res, {
      message: "User logged out",
    });
  });

  fastify.get("/me", { preHandler: authMiddleware }, async (req, res) => {
    const user = req.user;
    console.log(user);
    return successResponse(res, {
      message: "User info",
      data: user,
    });
  });
}
