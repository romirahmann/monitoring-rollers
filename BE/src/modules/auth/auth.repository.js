export const authRepository = (db) => ({
  getByUsername: async (username) => {
    return await db("users").where({ username }).first();
  },
  createUser: async (data) => {
    const [id] = await db("users").insert(data);
    return await db("users").where({ id }).first();
  },
});
