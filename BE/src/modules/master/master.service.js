import { uploadService } from "../uploads/upload.service.js";

// KATEGORI MESIN
export const categoriesMachineServices = ({ repository, fastify }) => ({
  getAll: async (search) => {
    const categories = await repository.getAll(search);
    return categories;
  },
  getById: async (id) => {
    const category = await repository.getById(id);
    return category;
  },
  getByName: async (name) => {
    const categoryName = name.toLowerCase();
    const category = await repository.getByName(categoryName);
    return category;
  },
  create: async (data) => {
    const newCategory = await repository.create(data);
    return newCategory;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Category machine not found");
    }
    return await repository.update(id, data);
  },
  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Category machine not found");
    }
    await repository.delete(id);
  },
});

// TIPE MESIN
export const typesMachineServices = ({ repository, fastify }) => ({
  getAll: async () => {
    const types = await repository.getAll();
    return types;
  },
  getById: async (id) => {
    const type = await repository.getById(id);
    return type;
  },
  getByName: async (name) => {
    const type = await repository.getByName(name);

    return type;
  },
  create: async (data) => {
    let filename = null;
    let { name, description, category_id } = data;

    if (data.image) {
      const uploaded = await uploadService.saveFile(data.image);
      filename = uploaded.filename;
    }

    const payload = {
      name: name?.value,
      description: description?.value,
      category_id: category_id.value,
      image: filename,
    };

    console.log("PAYLOAD: ", payload);

    const newType = await repository.create(payload);
    console.log("RETURN: ", newType);
    return true;
    // return true;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);

    if (!exiting) {
      throw new Error("Type machine not found");
    }

    const { name, description, category_id } = data;

    const payload = {
      name: name.value,
      description: description.value,
      category_id: Number(category_id.value),
    };

    if (data.image) {
      const uploaded = await uploadService.saveFile(data.image);

      payload.image = uploaded.filename;
    }

    return await repository.update(id, payload);
  },
  softDelete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Type machine not found");
    }

    let payload = {
      is_active: 0,
    };
    return await repository.update(id, payload);
  },
  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Type machine not found");
    }
    await repository.delete(id);
  },
});

// MESIN
export const machinesServices = ({ repository, fastify }) => ({
  getAll: async (search) => {
    const machines = await repository.getAll(search);
    return machines;
  },
  getById: async (id) => {
    const machine = await repository.getById(id);
    return machine;
  },
  getByName: async (name) => {
    const categoryName = name.toLowerCase();
  },
  create: async (data) => {
    let filename = null;
    let { name, unit, type_machine_id } = data;

    if (data.image) {
      const uploaded = await uploadService.saveFile(data.image);

      filename = uploaded.filename;
    }

    const payload = {
      name: name?.value,
      unit: unit?.value,
      type_machine_id: Number(type_machine_id?.value),
      image: filename,
    };
    const newMachine = await repository.create(payload);
    return newMachine;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Machine not found");
    }

    let payload = null;
    let filename = null;
    let { name, unit, type_machine_id } = data;

    if (data.image) {
      const uploaded = await uploadService.saveFile(data.image);

      filename = uploaded.filename;
    }

    if (filename) {
      payload = {
        name: name?.value,
        unit: unit?.value,
        type_machine_id: Number(type_machine_id?.value),
        image: filename,
      };
    } else {
      payload = {
        name: name?.value,
        unit: unit?.value,
        type_machine_id: Number(type_machine_id?.value),
      };
    }

    return await repository.update(id, payload);
  },
  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Machine not found");
    }
    await repository.delete(id);
  },
});

// ROLLERS
export const rollersServices = ({ repository, fastify }) => ({
  getAll: async () => {
    const rollers = await repository.getAll();
    return rollers;
  },
  getById: async (id) => {
    const roller = await repository.getById(id);
    return roller;
  },
  getByPositionId: async (id) => {
    const roller = await repository.getByPositionId(id);
    return roller;
  },
  create: async (data) => {
    console.log(data);
    const newRoller = await repository.create(data);
    return newRoller;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Roller not found");
    }

    return await repository.update(id, data);
  },
  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Roller not found");
    }
    await repository.delete(id);
  },
});

// POSITION
export const positionsServices = ({ repository, fastify }) => ({
  getAll: async () => {
    const positions = await repository.getAll();
    return positions;
  },

  getById: async (id) => {
    const position = await repository.getById(id);
    return position;
  },

  getByMachineId: async (machine_id) => {
    const positions = await repository.getByMachineId(machine_id);
    return positions;
  },

  create: async (data) => {
    const newPosition = await repository.create(data);
    return newPosition;
  },

  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Position not found");
    }
    return await repository.update(id, data);
  },

  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Position not found");
    }
    await repository.delete(id);
  },
});
