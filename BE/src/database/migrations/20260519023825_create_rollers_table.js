export async function up(knex) {
  await knex.schema.createTable("rollers", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("code").notNullable().unique();
    tbl.enum("type", ["karet", "teflon", "chrome"]).defaultTo("karet");
    tbl
      .integer("category_machine_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("categories_machine");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("rollers");
}
