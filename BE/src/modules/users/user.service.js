export const userServices = ({ userRepository, fastify }) => ({
  getAll: async () => {
    const users = await userRepository.getAll();
    return users;
  },

  getUser: async (username) => {
    const exiting = await userRepository.getByUsername(username);
    if (!exiting) {
      throw new Error("User not found");
    }
    const user = await userRepository.getById(exiting.id);
    return user;
  },

  update: async (id, data) => {
    const existing = await userRepository.getById(id);
    if (!existing) {
      throw new Error("User not found");
    }
    const updatedUser = await userRepository.update(existing.id, data);
    return updatedUser;
  },

  softDelete: async (id) => {
    const existing = await userRepository.getById(id);
    if (!existing) {
      throw new Error("User not found");
    }
    await userRepository.update(existing.id, { is_active: false });
  },
  deletedPermanently: async (id) => {
    const existing = await userRepository.getById(id);
    if (!existing) {
      throw new Error("User not found");
    }
    await userRepository.delete(existing.id);
  },
  getAllRoles: async () => {
    const roles = await userRepository.getAllRole();
    return roles;
  },
});
