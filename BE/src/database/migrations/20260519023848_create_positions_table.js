export async function up(knex) {
  await knex.schema.createTable("positions", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("position").notNullable();
    tbl.integer("machine_id").unsigned().references("id").inTable("machines");
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("positions");
}
