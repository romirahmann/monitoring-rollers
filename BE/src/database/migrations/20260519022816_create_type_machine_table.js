export async function up(knex) {
  await knex.schema.createTable("type_machine", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("name").notNullable();
    tbl
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories_machine")
      .onDelete("SET NULL");
    tbl.string("description");
    tbl.boolean("is_active").defaultTo(true);
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("type_machine");
}
