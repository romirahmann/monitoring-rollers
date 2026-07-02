import { successResponse } from "../../common/response.js";
import { uploadController } from "../uploads/upload.controller.js";
import { uploadService } from "../uploads/upload.service.js";
import {
  categories_machineRepository,
  machinesRepository,
  positionsRepository,
  rollersRepository,
  types_machineRepository,
} from "./master.repository.js";
import {
  categoriesMachineServices,
  machinesServices,
  positionsServices,
  rollersServices,
  typesMachineServices,
} from "./master.service.js";

export default async function (fastify) {
  const repository = {
    categoriesMachine: categories_machineRepository(fastify.db),
    typesMachine: types_machineRepository(fastify.db),
    machines: machinesRepository(fastify.db),
    rollers: rollersRepository(fastify.db),
    positions: positionsRepository(fastify.db),
  };

  const services = {
    categoriesMachine: categoriesMachineServices({
      repository: repository.categoriesMachine,
      fastify,
    }),
    typesMachine: typesMachineServices({
      repository: repository.typesMachine,
      fastify,
    }),
    machines: machinesServices({ repository: repository.machines, fastify }),
    rollers: rollersServices({ repository: repository.rollers, fastify }),
    positions: positionsServices({ repository: repository.positions, fastify }),
  };

  // Routes for categories_machine

  fastify.get("/categories-machine", async (req, res) => {
    const { search } = req.query;
    const categories = await services.categoriesMachine.getAll(search);
    return successResponse(res, { data: categories });
  });

  fastify.get("/categories-machine/:id", async (req, res) => {
    const { id } = req.params;
    const category = await services.categoriesMachine.getById(id);
    return successResponse(res, { data: category });
  });

  fastify.post("/categories-machine", async (req, res) => {
    const newCategory = await services.categoriesMachine.create(req.body);
    return successResponse(res, { data: newCategory });
  });

  fastify.put("/categories-machine/:id", async (req, res) => {
    const { id } = req.params;
    const updatedCategory = await services.categoriesMachine.update(
      id,
      req.body,
    );
    return successResponse(res, { data: updatedCategory });
  });

  fastify.delete("/categories-machine/deactived/:id", async (req, res) => {
    const { id } = req.params;
    await services.categoriesMachine.update(id, { is_active: 0 });
    return successResponse(res, { message: "Category machine deactivated" });
  });

  fastify.delete("/categories-machine/deleted/:id", async (req, res) => {
    const { id } = req.params;
    await services.categoriesMachine.delete(id);
    return successResponse(res, { message: "Category machine deleted" });
  });

  // Routes for type_machine
  fastify.get("/type-machine", async (req, res) => {
    const types = await services.typesMachine.getAll();
    return successResponse(res, { data: types });
  });
  fastify.get("/type-machine/:id", async (req, res) => {
    const { id } = req.params;
    const type = await services.typesMachine.getById(id);
    return successResponse(res, { data: type });
  });
  fastify.get("/type/name/:name", async (req, res) => {
    const { name } = req.params;
    const type = await services.typesMachine.getByName(name);
    return successResponse(res, { data: type });
  });

  // CREATE
  fastify.post("/type-machine", async (req, res) => {
    let body = req.body;
    // console.log(body.category_id);

    // let category = await services.categoriesMachine.getByName(
    //   body.category.value,
    // );

    // let payload = {
    //   ...body,
    //   category_id: category.id,
    // };
    const result = await services.typesMachine.create(body);

    return successResponse(res, {
      message: "UPLOAD TYPE SUCCESSFULLY!",
      data: result,
    });
  });

  fastify.put("/type-machine/:id", async (req, res) => {
    const { id } = req.params;
    let body = req.body;

    const updatedType = await services.typesMachine.update(id, body);
    return successResponse(res, { data: updatedType });
  });
  fastify.patch("/type-machine/deactived/:id", async (req, res) => {
    const { id } = req.params;
    await services.typesMachine.softDelete(id);
    return successResponse(res, { message: "Type machine deactivated" });
  });
  fastify.delete("/type-machine/:id", async (req, res) => {
    const { id } = req.params;
    await services.typesMachine.delete(id);
    return successResponse(res, { message: "Type machine deleted" });
  });

  // Routes for machines
  fastify.get("/machines", async (req, res) => {
    const { search } = req.query;
    const machines = await services.machines.getAll(search);
    return successResponse(res, { data: machines });
  });
  fastify.get("/machines/:id", async (req, res) => {
    const { id } = req.params;
    const machine = await services.machines.getById(id);
    return successResponse(res, { data: machine });
  });

  fastify.post("/machines", async (req, res) => {
    const body = req.body;
    const newMachine = await services.machines.create(body);

    return successResponse(res, { data: newMachine });
  });
  fastify.put("/machines/:id", async (req, res) => {
    const { id } = req.params;
    const updatedMachine = await services.machines.update(id, req.body);
    return successResponse(res, { data: updatedMachine });
  });
  fastify.delete("/machines/deactived/:id", async (req, res) => {
    const { id } = req.params;
    await services.machines.update(id, { is_active: 0 });
    return successResponse(res, { message: "Machine deactivated" });
  });
  fastify.delete("/machines/:id", async (req, res) => {
    const { id } = req.params;
    await services.machines.delete(id);
    return successResponse(res, { message: "Machine deleted" });
  });

  //   ROUTE FOR ROLLERS
  fastify.get("/rollers", async (req, res) => {
    const { search } = req.query;
    const rollers = await services.rollers.getAll(search);
    return successResponse(res, { data: rollers });
  });

  fastify.get("/roller/:id", async (req, res) => {
    const { id } = req.params;
    const roller = await services.rollers.getById(id);
    return successResponse(res, { data: roller });
  });

  fastify.get("/roller/position/:positionId", async (req, res) => {
    const { positionId } = req.params;
    const roller = await services.rollers.getByPositionId(positionId);
    return successResponse(res, { data: roller });
  });

  fastify.post("/roller", async (req, res) => {
    const newRoller = await services.rollers.create(req.body);

    return successResponse(res, { data: newRoller });
  });

  fastify.put("/roller/:id", async (req, res) => {
    const { id } = req.params;
    const updatedRoller = await services.rollers.update(id, req.body);
    return successResponse(res, { data: updatedRoller });
  });

  fastify.delete("/roller/deactived/:id", async (req, res) => {
    const { id } = req.params;
    await services.rollers.update(id, { is_active: 0 });
    return successResponse(res, { message: "Roller deactivated" });
  });

  fastify.delete("/roller/:id", async (req, res) => {
    const { id } = req.params;
    await services.rollers.delete(id);
    return successResponse(res, { message: "Roller deleted" });
  });

  // ROUTES POSITION
  fastify.get("/positions", async (req, res) => {
    const positions = await services.positions.getAll();
    return successResponse(res, { data: positions });
  });

  fastify.get("/position/:id", async (req, res) => {
    const { id } = req.params;
    const position = await services.positions.getById(id);
    return successResponse(res, { data: position });
  });

  fastify.get("/positions/machine/:machine_id", async (req, res) => {
    const { machine_id } = req.params;
    console.log(machine_id);

    const positions = await services.positions.getByMachineId(machine_id);
    return successResponse(res, { data: positions });
  });

  fastify.post("/position", async (req, res) => {
    console.log(req.body);
    const newPosition = await services.positions.create(req.body);
    return successResponse(res, { data: newPosition });
  });

  fastify.put("/position/:id", async (req, res) => {
    const { id } = req.params;
    const updatedPosition = await services.positions.update(id, req.body);
    return successResponse(res, { data: updatedPosition });
  });

  fastify.delete("/position/:id", async (req, res) => {
    const { id } = req.params;
    await services.positions.delete(id);
    return successResponse(res, { message: "Position deleted" });
  });
}
