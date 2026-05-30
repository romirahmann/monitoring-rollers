export async function up(knex) {
  await knex.schema.createTable("categories_machine", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("name").notNullable().unique();
    tbl.string("description");
    tbl.boolean("is_active").defaultTo(true);
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("categories_machine");
}
