const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

module.exports = {
  
  getAllModel: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex("vehicle_model").select("*");

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

  createModel: async ({ name, type_id}) => {
    try {
      let data = await knex("vehicle_model").insert({
        name, vehicle_type_id:type_id
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateModel: async ({ id, name, type_id }) => {
    try {
      let data = await knex("vehicle_model").where({ id }).update({ name, vehicle_type_id : type_id });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteModel: async ({ id }) => {
    try {
      let data = await knex("vehicle_model").where({ id }).del();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
