export const inspectionsServices = ({ repository, fastify }) => ({
  getAllInspection: async () => {
    const inspections = await repository.getAll();
    return inspections;
  },
  getInpectionById: async (id) => {
    const inspection = await repository.getById(id);
    return inspection;
  },
  createInspection: async (data) => {
    const newInspection = await repository.create(data);
    return newInspection;
  },
  updateInspection: async (id, data) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Inspection not found");
    }
    return await repository.update(id, data);
  },
  deleteInspection: async (id) => {
    const exiting = await repository.getById(id);
    if (!exiting) {
      throw new Error("Inspection not found");
    }
    return await repository.delete(id);
  },
});
