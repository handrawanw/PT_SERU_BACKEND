const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

module.exports = {
  
  getAllVYear: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex("vehicle_year").select("*");

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

  createVYear: async ({ name }) => {
    try {
      let data = await knex("vehicle_year").insert({
        name,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateVYear: async ({ id, name }) => {
    try {
      let data = await knex("vehicle_year").where({ id }).update({ name });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteVYear: async ({ id }) => {
    try {
      let data = await knex("vehicle_year").where({ id }).del();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
