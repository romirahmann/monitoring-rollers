import { successResponse } from "../../common/response.js";
import { installationRepository } from "./installation.repository.js";
import { installationServices } from "./installation.service.js";

export default async function (fastify) {
  const repository = installationRepository(fastify.db);
  const service = installationServices({ repository, fastify });

  fastify.get("/", async (req, res) => {
    const { search } = req.query;
    const installations = await service.getAll(search);
    return successResponse(res, { data: installations });
  });

  fastify.get("/:id", async (req, res) => {
    const { id } = req.params;
    const installation = await service.getById(id);
    return successResponse(res, { data: installation });
  });

  fastify.post("/", async (req, res) => {
    const newInstallation = await service.create(req.body);
    return successResponse(res, { data: newInstallation });
  });

  fastify.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedInstallation = await service.update(id, req.body);
    return successResponse(res, { data: updatedInstallation });
  });

  fastify.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await service.delete(id);
    return successResponse(res, {
      message: "Installation deleted successfully",
    });
  });
}
