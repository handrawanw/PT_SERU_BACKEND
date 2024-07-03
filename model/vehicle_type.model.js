const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  
  getAllType: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.
      select([
        "vt.*",
        "vt.hash as id",
        knex.raw("md5(vt.hash) as hash"),
      ]).
      from("vehicle_type as vt")

      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let query_total = await knex(query.as("wd"))
      .count("* as total")
      .first();

      let datas = await query;

      let result = {
        per_page: limit ? parseInt(limit) : "all",
        last_page: limit ? Math.ceil(query_total.total / limit) : 1,
        total_data: parseInt(query_total.total),
        current_page: parseInt(page),
        data: datas
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getVType: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "vt.*",
      ]).from("vehicle_type as vt");

      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let query_total = await knex(query.as("wd"))
      .count("* as total")
      .first();

      let datas = await query;

      let result = {
        total_data: parseInt(query_total.total),
        data: datas
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createType: async ({ name, brand_id}) => {
    try {
      let data = await knex("vehicle_type").insert({
        name, vehicle_brand_id:brand_id,
        hash:String(ObjectID(Date.now()))
      }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateType: async ({ id, name, brand_id }) => {
    try {
      let data = await knex("vehicle_type").where({ hash:id }).update({ name, vehicle_brand_id : brand_id }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteType: async ({ id }) => {
    try {
      let data = await knex("vehicle_type").where({ hash:id }).del().returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
