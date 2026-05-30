export async function up(knex) {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("username").notNullable().unique();
    tbl.string("password").notNullable();
    tbl
      .integer("role_id")
      .unsigned()
      .references("id")
      .inTable("roles")
      .onDelete("SET NULL");
    tbl.boolean("is_active").defaultTo(true);
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("users");
}
