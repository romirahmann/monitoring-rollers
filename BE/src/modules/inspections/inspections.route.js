import { successResponse } from "../../common/response.js";
import { inspectionsRepository } from "./inspections.repository.js";
import { inspectionsServices } from "./inspections.service.js";

export default async function (fastify) {
  const repository = {
    inspections: inspectionsRepository(fastify.db),
  };
  const services = {
    inspections: inspectionsServices({
      repository: repository.inspections,
      fastify,
    }),
  };

  // Routes for inspections
  fastify.get("/", async (req, res) => {
    const inspections = await services.inspections.getAllInspection();
    return successResponse(res, { data: inspections });
  });

  fastify.get("/:id", async (req, res) => {
    const { id } = req.params;
    const inspection = await services.inspections.getInpectionById(id);
    if (!inspection) {
      return res.status(404).send({ message: "Inspection not found" });
    }
    return successResponse(res, { data: inspection });
  });

  fastify.get("/machine/:id", async (req, res) => {
    const { id } = req.params;
    const inspection = await services.inspections.getInpectionByMachineId(id);
    if (!inspection) {
      return res.status(404).send({ message: "Inspection not found" });
    }
    return successResponse(res, { data: inspection });
  });

  fastify.post("/", async (req, res) => {
    const newInspection = await services.inspections.createInspection(req.body);
    return successResponse(res, { data: newInspection });
  });

  fastify.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedInspection = await services.inspections.updateInspection(
      id,
      req.body,
    );
    return successResponse(res, { data: updatedInspection });
  });

  fastify.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await services.inspections.deleteInspection(id);
    return successResponse(res, { message: "Inspection deleted" });
  });
}
