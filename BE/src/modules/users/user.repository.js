export const userRepository = (db) => ({
  getAll: async () => {
    const users = await db("users as u")
      .leftJoin("roles as r", "r.id", "u.role_id")
      .select(
        "u.id",
        "u.username",
        "u.role_id",
        "u.is_active",
        "u.created_at",
        "u.updated_at",
        "r.name as role_name",
      );
    return users;
  },
  getByUsername: async (username) => {
    const user = await db("users as u")
      .leftJoin("roles as r", "r.id", "u.role_id")
      .where({ "u.username": username })
      .select(
        "u.id",
        "u.username",
        "u.role_id",
        "u.is_active",
        "u.created_at",
        "u.updated_at",
        "r.name as role_name",
      )
      .first();
    return user;
  },
  getById: async (id) => {
    const user = await db("users as u")
      .leftJoin("roles as r", "r.id", "u.role_id")
      .where({ "u.id": id })
      .select(
        "u.id",
        "u.username",
        "u.role_id",
        "u.created_at",
        "u.updated_at",
        "r.name as role_name",
      )
      .first();
    return user;
  },
  update: async (id, data) => {
    await db("users").where({ id }).update(data);
    const updatedUser = await db("users").where({ id }).first();
    return updatedUser;
  },
  delete: async (id) => {
    await db("users").where({ id }).del();
  },
  getAllRole: async () => await db("roles").select("*"),
});
