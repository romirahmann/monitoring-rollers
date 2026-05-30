import { errorResponse, successResponse } from "../../common/response.js";
import { userRepository } from "./user.repository.js";
import { getByIdSchema } from "./user.schema.js";
import { userServices } from "./user.service.js";

export default async function (fastify) {
  const repository = userRepository(fastify.db);
  const services = userServices({ userRepository: repository, fastify });

  fastify.get("/", async (req, res) => {
    const users = await services.getAll();
    return successResponse(res, { data: users });
  });

  fastify.get("/:username", async (req, res) => {
    const { username } = req.params;
    const user = await services.getUser(username);
    return successResponse(res, { data: user });
  });

  fastify.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = await services.update(id, req.body);
    return successResponse(res, { data: updatedUser });
  });

  fastify.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await services.softDelete(id);
    return successResponse(res, { message: "User deactivated" });
  });

  fastify.delete("/permanent/:id", async (req, res) => {
    const { id } = req.params;
    await services.deletedPermanently(id);
    return successResponse(res, { message: "User deleted permanently" });
  });
}
