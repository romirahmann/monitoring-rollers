export async function up(knex) {
  await knex.schema.createTable("machines", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("name").notNullable();
    tbl.string("unit").notNullable();
    tbl
      .integer("type_machine_id")
      .unsigned()
      .references("id")
      .inTable("type_machine");
    tbl.boolean("is_active").defaultTo(true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("machines");
}
