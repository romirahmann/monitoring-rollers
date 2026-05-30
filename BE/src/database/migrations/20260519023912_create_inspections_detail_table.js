export async function up(knex) {
  await knex.schema.createTable("inspections_detail", (tbl) => {
    tbl.increments("id").primary();

    tbl.decimal("size", 10, 2).notNullable();

    tbl.integer("point_no").notNullable();

    tbl
      .integer("inspection_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("inspections");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());

    tbl
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("inspections_detail");
}
