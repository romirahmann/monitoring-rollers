// KATEGORI MESIN
export const categoriesMachineServices = ({ repository, fastify }) => ({
  getAll: async () => {
    const categories = await repository.getAll();
    return categories;
  },
  getById: async (id) => {
    const category = await repository.getById(id);
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
    console.log(name, type);
    return type;
  },
  create: async (data) => {
    const newType = await repository.create(data);
    return newType;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Type machine not found");
    }
    return await repository.update(id, data);
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
  getAll: async () => {
    const machines = await repository.getAll();
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
    const newMachine = await repository.create(data);
    return newMachine;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Machine not found");
    }
    return await repository.update(id, data);
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
  create: async (data) => {
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
