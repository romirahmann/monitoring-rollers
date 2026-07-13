export const inspectionsRepository = (db) => ({
  // ===========================
  // GET ALL
  // ===========================
  getAll: async () => {
    const inspections = await db("inspections as i")
      .leftJoin("machines as m", "m.id", "i.machine_id")
      .leftJoin("users as u", "u.id", "i.checker_id")
      .select(
        "i.id",
        "i.notes",
        "i.inspection_date",
        "i.machine_id",
        "i.checker_id",
        "m.name as machine_name",
        "u.username as checker_name",
      )
      .orderBy("i.inspection_date", "desc");

    if (!inspections.length) {
      return [];
    }

    const inspectionIds = inspections.map((i) => i.id);

    const details = await db("inspections_detail as d")
      .leftJoin("rollers as r", "r.id", "d.roller_id")
      .leftJoin("positions as p", "p.id", "d.position_id")
      .whereIn("d.inspection_id", inspectionIds)
      .select(
        "d.id",
        "d.inspection_id",
        "d.roller_id",
        "d.position_id",
        "r.code as roller_code",
        "r.type as roller_type",
        "p.position as position_name",
      );

    const detailIds = details.map((d) => d.id);

    let measurements = [];

    if (detailIds.length) {
      measurements = await db("inspections_measurement as im")
        .leftJoin("roller_points as rp", "rp.id", "im.roller_point_id")
        .whereIn("im.inspection_detail_id", detailIds)
        .select(
          "im.id",
          "im.inspection_detail_id",
          "im.roller_point_id",
          "im.size",
          "rp.point_no",
          "rp.initial_size",
          "rp.minimum_size",
        );
    }

    const measurementMap = {};

    measurements.forEach((m) => {
      if (!measurementMap[m.inspection_detail_id]) {
        measurementMap[m.inspection_detail_id] = [];
      }

      measurementMap[m.inspection_detail_id].push(m);
    });

    const detailMap = {};

    details.forEach((detail) => {
      detail.measurements = measurementMap[detail.id] || [];

      if (!detailMap[detail.inspection_id]) {
        detailMap[detail.inspection_id] = [];
      }

      detailMap[detail.inspection_id].push(detail);
    });

    return inspections.map((inspection) => ({
      ...inspection,
      details: detailMap[inspection.id] || [],
    }));
  },

  // ===========================
  // GET BY ID
  // ===========================
  getById: async (id) => {
    const inspection = await db("inspections as i")
      .leftJoin("machines as m", "m.id", "i.machine_id")
      .leftJoin("users as u", "u.id", "i.checker_id")
      .where("i.id", id)
      .first()
      .select(
        "i.id",
        "i.notes",
        "i.inspection_date",
        "i.machine_id",
        "i.checker_id",
        "m.name as machine_name",
        "u.username as checker_name",
      );

    if (!inspection) {
      return null;
    }

    const details = await db("inspections_detail as d")
      .leftJoin("rollers as r", "r.id", "d.roller_id")
      .leftJoin("positions as p", "p.id", "d.position_id")
      .where("d.inspection_id", id)
      .select(
        "d.id",
        "d.inspection_id",
        "d.roller_id",
        "d.position_id",
        "r.code as roller_code",
        "r.type as roller_type",
        "p.position as position_name",
      );

    const detailIds = details.map((d) => d.id);

    let measurements = [];

    if (detailIds.length) {
      measurements = await db("inspections_measurement as im")
        .leftJoin("roller_points as rp", "rp.id", "im.roller_point_id")
        .whereIn("im.inspection_detail_id", detailIds)
        .select(
          "im.id",
          "im.inspection_detail_id",
          "im.roller_point_id",
          "im.size",
          "rp.point_no",
          "rp.initial_size",
          "rp.minimum_size",
        );
    }

    details.forEach((detail) => {
      detail.measurements = measurements.filter(
        (m) => m.inspection_detail_id === detail.id,
      );
    });

    inspection.details = details;

    return inspection;
  },

  // ===========================
  // CREATE
  // ===========================
  create: async (data) => {
    return await db.transaction(async (trx) => {
      const [inspectionId] = await trx("inspections").insert({
        machine_id: data.machine_id,
        inspection_date: data.inspection_date,
        checker_id: data.checker_id,
        notes: data.notes,
      });

      for (const detail of data.details || []) {
        const [detailId] = await trx("inspection_detail").insert({
          inspection_id: inspectionId,
          roller_id: detail.roller_id,
          position_id: detail.position_id,
        });

        if (detail.measurements?.length) {
          await trx("inspection_measurement").insert(
            detail.measurements.map((m) => ({
              inspection_detail_id: detailId,
              roller_point_id: m.roller_point_id,
              size: m.size,
            })),
          );
        }
      }

      return inspectionId;
    });
  },

  // ===========================
  // UPDATE
  // ===========================
  update: async (id, data) => {
    return await db.transaction(async (trx) => {
      await trx("inspections").where({ id }).update({
        machine_id: data.machine_id,
        inspection_date: data.inspection_date,
        checker_id: data.checker_id,
        notes: data.notes,
      });

      const detailIds = await trx("inspection_detail")
        .where({
          inspection_id: id,
        })
        .pluck("id");

      if (detailIds.length) {
        await trx("inspection_measurement")
          .whereIn("inspection_detail_id", detailIds)
          .del();
      }

      await trx("inspection_detail")
        .where({
          inspection_id: id,
        })
        .del();

      for (const detail of data.details || []) {
        const [detailId] = await trx("inspection_detail").insert({
          inspection_id: id,
          roller_id: detail.roller_id,
          position_id: detail.position_id,
        });

        if (detail.measurements?.length) {
          await trx("inspection_measurement").insert(
            detail.measurements.map((m) => ({
              inspection_detail_id: detailId,
              roller_point_id: m.roller_point_id,
              size: m.size,
            })),
          );
        }
      }

      return id;
    });
  },

  // ===========================
  // DELETE
  // ===========================
  delete: async (id) => {
    return await db.transaction(async (trx) => {
      await trx("inspections")
        .where({
          id,
        })
        .del();

      return true;
    });
  },

  // ===========================
  // GET BY MACHINE
  // ===========================
  getByMachineId: async (machineId) => {
    const rollers = await db("installation_rollers as ir")
      .join("rollers as r", "r.id", "ir.roller_id")
      .join("positions as p", "p.id", "ir.position_id")
      .leftJoin("categories_machine as cm", "cm.id", "r.category_id")
      .select(
        "ir.id as installation_id",

        "ir.roller_id",
        "ir.position_id",

        "r.code",
        "r.type",
        "r.status",

        "p.position",
        "p.machine_id",

        "cm.name as category_machine_name",
      )
      .where("p.machine_id", machineId)
      .orderBy("p.position");

    for (const roller of rollers) {
      roller.points = await db("roller_points")
        .select("id", "point_no", "initial_size", "minimum_size")
        .where("roller_id", roller.roller_id)
        .orderBy("point_no");
    }

    return rollers;
  },
});
