const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

module.exports = {
  
  getAllType: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex("vehicle_brand").select("*");

      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let query_total = query
        .clone()
        .clear("select")
        .count("* as total")
        .first();
      query_total = await query_total;

      let datas = await query;

      let result = {
        per_page: limit ? parseInt(limit) : "all",
        last_page: limit ? Math.ceil(query_total / limit) : 1,
        total_data: parseInt(query_total),
        current_page: parseInt(page),
        data: datas
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createType: async ({ name }) => {
    try {
      let data = await knex("vehicle_brand").insert({
        name,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateType: async ({ id, name }) => {
    try {
      let data = await knex("vehicle_brand").where({ id }).update({ name });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteType: async ({ id }) => {
    try {
      let data = await knex("vehicle_brand").where({ id }).del();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
