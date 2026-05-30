export const authServices = ({ authRepository, fastify }) => ({
  register: async (data) => {
    const existing = await authRepository.getByUsername(data.username);
    if (existing) {
      throw new Error("Username already exists");
    }

    const hash = await fastify.hashPassword(data.password);
    const user = await authRepository.createUser({ ...data, password: hash });
    return user;
  },

  login: async (data) => {
    console.log(data);
    const user = await authRepository.getByUsername(data.username);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const valid = await fastify.verifyPassword(data.password, user.password);

    if (!valid) {
      throw new Error("Invalid username or password");
    }

    const token = fastify.jwt.sign({ id: user.id, username: user.username });

    return { token, user };
  },
});
