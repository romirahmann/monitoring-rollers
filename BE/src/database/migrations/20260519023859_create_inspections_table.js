export async function up(knex) {
  await knex.schema.createTable("inspections", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("notes").notNullable();
    tbl.datetime("inspection_date").notNullable();
    tbl
      .integer("posisi_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("positions");
    tbl.integer("roller_id").unsigned().references("id").inTable("rollers");
    tbl.integer("checker_id").unsigned().references("id").inTable("users");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("inspections");
}
