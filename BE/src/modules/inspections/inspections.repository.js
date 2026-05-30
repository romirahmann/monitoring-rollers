export const inspectionsRepository = (db) => ({
  getAll: async () => {
    const inspections = await db("inspections as i")
      .leftJoin("positions as p", "p.id", "i.posisi_id")
      .leftJoin("rollers as r", "r.id", "i.roller_id")
      .leftJoin("users as u", "u.id", "i.checker_id")
      .select(
        "i.id",
        "i.notes",
        "i.inspection_date",
        "i.posisi_id",
        "i.roller_id",
        "i.checker_id",

        "p.position as position_name",
        "r.code as roller_code",
        "u.username as checker_name",
      );

    const inspectionIds = inspections.map((i) => i.id);

    const details = await db("inspections_detail as d")
      .leftJoin("roller_points as rp", "rp.id", "d.roller_point_id")
      .whereIn("d.inspection_id", inspectionIds)
      .select(
        "d.id",
        "d.inspection_id",
        "d.size",
        "d.roller_point_id",
        "rp.point_no",
        "rp.initial_size",
        "rp.minimum_size",
      );

    const groupedDetails = {};

    details.forEach((detail) => {
      if (!groupedDetails[detail.inspection_id]) {
        groupedDetails[detail.inspection_id] = [];
      }

      groupedDetails[detail.inspection_id].push(detail);
    });

    return inspections.map((inspection) => ({
      ...inspection,
      details: groupedDetails[inspection.id] || [],
    }));
  },

  getById: async (id) => {
    const inspection = await db("inspections as i")
      .leftJoin("positions as p", "p.id", "i.posisi_id")
      .leftJoin("rollers as r", "r.id", "i.roller_id")
      .leftJoin("users as u", "u.id", "i.checker_id")
      .where("i.id", id)
      .first()
      .select(
        "i.id",
        "i.notes",
        "i.inspection_date",
        "i.posisi_id",
        "i.roller_id",
        "i.checker_id",

        "p.position as position_name",
        "r.code as roller_code",
        "u.username as checker_name",
      );

    if (!inspection) {
      return null;
    }

    const details = await db("inspections_detail as d")
      .leftJoin("roller_points as rp", "rp.id", "d.roller_point_id")
      .where("d.inspection_id", inspection.id)
      .select(
        "d.id",
        "d.inspection_id",
        "d.size",
        "d.roller_point_id",
        "rp.point_no",
        "rp.initial_size",
        "rp.minimum_size",
      );

    inspection.details = details;

    return inspection;
  },

  create: async (data) => {
    return await db.transaction(async (trx) => {
      const inspectionData = {
        notes: data.notes,
        inspection_date: data.inspection_date,
        posisi_id: data.posisi_id,
        roller_id: data.roller_id,
        checker_id: data.checker_id,
      };

      const [id] = await trx("inspections").insert(inspectionData);

      if (data.details?.length) {
        const details = data.details.map((detail) => ({
          size: detail.size,
          roller_point_id: detail.roller_point_id,
          inspection_id: id,
        }));

        await trx("inspections_detail").insert(details);
      }

      return id;
    });
  },

  update: async (id, data) => {
    return await db.transaction(async (trx) => {
      const inspectionData = {
        notes: data.notes,
        inspection_date: data.inspection_date,
        posisi_id: data.posisi_id,
        roller_id: data.roller_id,
        checker_id: data.checker_id,
      };

      await trx("inspections").where({ id }).update(inspectionData);

      await trx("inspections_detail").where({ inspection_id: id }).del();

      if (data.details?.length) {
        const details = data.details.map((detail) => ({
          size: detail.size,
          roller_point_id: detail.roller_point_id,
          inspection_id: id,
        }));

        await trx("inspections_detail").insert(details);
      }

      return id;
    });
  },

  delete: async (id) => {
    return await db.transaction(async (trx) => {
      await trx("inspections").where({ id }).del();
    });
  },
});
