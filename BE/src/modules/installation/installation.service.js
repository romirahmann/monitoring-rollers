export const installationServices = ({ repository, fastify }) => ({
  getAll: async (search) => {
    const installations = await repository.getAll(search);
    return installations;
  },

  getById: async (id) => {
    const installation = await repository.getById(id);
    return installation;
  },

  create: async (data) => {
    const newInstallation = await repository.create(data);
    return newInstallation;
  },
  update: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Category Machine not found");
    }
    return await repository.update(id, data);
  },
  delete: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Category Machine not found");
    }
    await repository.delete(id);
  },
});
