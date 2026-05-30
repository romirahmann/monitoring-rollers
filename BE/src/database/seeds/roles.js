export async function seed(knex) {
  await knex("roles").del();

  await knex("roles").insert([
    {
      name: "ADMIN",
      description: "Administrator with full access",
    },
    {
      name: "MANAGER",
      description: "Manager with limited access",
    },
    {
      name: "USER",
      description: "Regular User with limited access",
    },
  ]);
}
