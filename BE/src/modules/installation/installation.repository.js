export const installationRepository = (db) => ({
  getAll: async (search) => {
    let query = db("installation_rollers as i")
      .leftJoin("rollers as r", "r.id", "i.roller_id")
      .leftJoin("positions as p", "p.id", "i.position_id")
      .leftJoin("machines as m", "m.id", "p.machine_id")
      .leftJoin("categories_machine as cm", "cm.id", "r.category_id")
      .select(
        "i.id",
        "i.roller_id",
        "i.installation_date",
        "i.installed_by",
        "r.code as roller_code",
        "p.position",
        "p.id as position_id",
        "cm.name as category_name",
        "m.name as machine_name",
      );

    if (search) {
      query = query.where("r.code", "like", `%${search}%`);
    }

    return await query;
  },

  create: async (installation) => {
    const [id] = await db("installation_rollers").insert(installation);
    return { id, ...installation };
  },

  getById: async (id) => {
    const installation = await db("installation_rollers").where({ id }).first();
    return installation;
  },

  update: async (id, installation) => {
    await db("installation_rollers").where({ id }).update(installation);
    return { id, ...installation };
  },

  delete: async (id) => {
    await db("installation_rollers").where({ id }).del();
  },
});
