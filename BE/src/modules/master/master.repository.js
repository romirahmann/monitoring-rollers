// KATEGORI MESIN
export const categories_machineRepository = (db) => ({
  getAll: async () => await db("categories_machine").select("*"),
  getById: async (id) => {
    const category_machine = await db("categories_machine")
      .where({ id })
      .first();
    return category_machine;
  },
  getByName: async (name) => {
    const categoryName = name.toLowerCase();
    const category_machine = await db("categories_machine")
      .where("name", categoryName)
      .first();
    return category_machine;
  },
  create: async (data) => {
    const [id] = await db("categories_machine").insert(data);
    const newCategory_machine = await db("categories_machine")
      .where({ id })
      .first();
    return newCategory_machine;
  },
  update: async (id, data) => {
    await db("categories_machine").where({ id }).update(data);
  },
  delete: async (id) => {
    await db("categories_machine").where({ id }).del();
  },
});

// TIPE MESIN
export const types_machineRepository = (db) => ({
  getAll: async () =>
    await db("type_machine as tm")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .select(
        "tm.id",
        "tm.name",
        "tm.is_active",
        "tm.category_id",
        "cm.name as category_name",
      ),

  getById: async (id) => {
    const type_machine = await db("type_machine as tm")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .select(
        "tm.id",
        "tm.name",
        "tm.is_active",
        "tm.category_id",
        "cm.name as category_name",
      )
      .where("tm.id", id)
      .first();
    return type_machine;
  },
  getByName: async (name) => {
    return await db.transaction(async (trx) => {
      const typeMachines = await trx("type_machine as tm")
        .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
        .select(
          "tm.id",
          "tm.name",
          "tm.is_active",
          "tm.description",
          "tm.category_id",
          "cm.name as category_name",
        )
        .where("cm.name", name);

      const result = await Promise.all(
        typeMachines.map(async (type) => {
          const units = await trx("machines").where("type_machine_id", type.id);

          return {
            ...type,
            units,
          };
        }),
      );

      return result;
    });
  },
  create: async (data) => {
    const [id] = await db("type_machine").insert(data);
    const newType_machine = await db("type_machine as tm")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .select("tm.id", "tm.name", "tm.category_id", "cm.name as category_name")
      .where("tm.id", id)
      .first();
    return newType_machine;
  },
  update: async (id, data) => {
    console.log("data di repository", data);
    await db("type_machine").where({ id }).update(data);
  },
  delete: async (id) => {
    await db("type_machine").where({ id }).del();
  },
});

// MESIN
export const machinesRepository = (db) => ({
  getAll: async () => {
    return await db("machines as m")
      .leftJoin("type_machine as tm", "tm.id", "m.type_machine_id")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .select(
        "m.id",
        "m.name",
        "m.unit",
        "m.is_active",
        "m.type_machine_id",
        "tm.name as type_name",
        "tm.category_id",
        "cm.name as category_name",
      );
  },
  getById: async (id) => {
    const machine = await db("machines as m")
      .leftJoin("type_machine as tm", "tm.id", "m.type_machine_id")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .select(
        "m.id",
        "m.name",
        "m.unit",
        "m.is_active",
        "m.type_machine_id",
        "tm.name as type_name",
        "tm.category_id",
        "cm.name as category_name",
      )
      .where("m.id", id)
      .first();
    return machine;
  },
  getByName: async (name) => {
    const machine = await db("machines as m")
      .select("m.id", "m.name")
      .where("m.name", name)
      .first();
    return machine;
  },

  getGrouByType: async () => {
    const rows = await db("type_machine as tm")
      .leftJoin("categories_machine as cm", "cm.id", "tm.category_id")
      .leftJoin("machines as m", "m.type_machine_id", "tm.id")
      .select(
        "tm.id",
        "tm.name",
        "tm.description",
        "cm.name as category_name",
        "m.id as machine_id",
        "m.name as machine_name",
      );

    const grouped = {};

    rows.forEach((row) => {
      if (!grouped[row.id]) {
        grouped[row.id] = {
          id: row.id,
          name: row.name,
          category_name: row.category_name,
          description: row.description,
          image:
            "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200&auto=format&fit=crop",
          units: [],
        };
      }

      if (row.machine_id) {
        grouped[row.id].units.push({
          id: row.machine_id,
          name: row.machine_name,
          status: "ONLINE",
        });
      }
    });

    return Object.values(grouped);
  },

  create: async (data) => {
    const [id] = await db("machines").insert(data);
    return id;
  },
  update: async (id, data) => {
    await db("machines").where({ id }).update(data);
    return id;
  },
  delete: async (id) => {
    await db("machines").where({ id }).del();
  },
});

// ROLLERS
export const rollersRepository = (db) => ({
  getAll: async () => {
    const rollers = await db("rollers as r")
      .leftJoin("categories_machine as cm", "cm.id", "r.category_machine_id")
      .select(
        "r.id",
        "r.code",
        "r.type",
        "r.status",
        "r.installed_at",
        "r.category_machine_id",

        "cm.name as category_machine_name",
      );

    for (const roller of rollers) {
      const points = await db("roller_points")
        .select("id", "point_no", "initial_size", "minimum_size")
        .where("roller_id", roller.id)
        .orderBy("point_no");

      roller.points = points;
    }

    return rollers;
  },

  getById: async (id) => {
    const roller = await db("rollers as r")
      .leftJoin("categories_machine as cm", "cm.id", "r.category_machine_id")
      .select(
        "r.id",
        "r.code",
        "r.type",
        "r.status",
        "r.installed_at",
        "r.category_machine_id",

        "cm.name as category_machine_name",
      )
      .where("r.id", id)
      .first();

    if (!roller) return null;

    const points = await db("roller_points")
      .select("id", "point_no", "initial_size", "minimum_size")
      .where("roller_id", roller.id)
      .orderBy("point_no");

    roller.points = points;

    return roller;
  },

  create: async (data) => {
    const trx = await db.transaction();

    try {
      const points = data.points || [];
      const rollerData = {
        code: data.code,
        type: data.type,
        status: data.status,
        installed_at: data.installed_at,
        category_machine_id: data.category_machine_id,
      };

      const [rollerId] = await trx("rollers").insert(rollerData);

      if (points.length > 0) {
        const pointPayload = points.map((point) => ({
          roller_id: rollerId,
          point_no: point.point_no,
          initial_size: point.initial_size,
          minimum_size: point.minimum_size ?? null,
        }));

        await trx("roller_points").insert(pointPayload);
      }

      await trx.commit();

      return rollerId;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  update: async (id, data) => {
    const trx = await db.transaction();

    try {
      const { points = [], ...rollerData } = data;

      await trx("rollers").where({ id }).update(rollerData);

      if (points.length > 0) {
        for (const point of points) {
          await trx("roller_points")
            .where({
              id: point.id,
              roller_id: id,
            })
            .update({
              initial_size: point.initial_size,
              minimum_size: point.minimum_size,
            });
        }
      }

      await trx.commit();

      return id;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  delete: async (id) => {
    await db("rollers").where({ id }).del();
  },
});

// POSITIONS
export const positionsRepository = (db) => ({
  getAll: async () =>
    await db("positions as p")
      .leftJoin("machines as m", "m.id", "p.machine_id")
      .select("p.*", "m.name as machine_name"),

  getById: async (id) => {
    const position = await db("positions as p")
      .leftJoin("machines as m", "m.id", "p.machine_id")
      .select("p.*", "m.name as machine_name")
      .where("p.id", id)
      .first();
    return position;
  },

  getByMachineId: async (machine_id) => {
    const positions = await db("positions as p")
      .leftJoin("machines as m", "m.id", "p.machine_id")
      .select("p.*", "m.name as machine_name")
      .where("p.machine_id", machine_id);
    return positions;
  },

  create: async (data) => {
    const [id] = await db("positions").insert(data);
    return id;
  },

  update: async (id, data) => {
    await db("positions").where({ id }).update(data);
    return id;
  },

  delete: async (id) => {
    await db("positions").where({ id }).del();
  },
});
