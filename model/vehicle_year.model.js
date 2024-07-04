const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  
  getAllVYear: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "vy.*",
        "vy.hash as id",
        knex.raw("md5(vy.hash) as hash")
      ]).from("vehicle_year as vy");

      
      let query_total = await knex(query.as("wd"))
      .count("* as total")
      .first();
     
      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

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

  getYearById: async ({ id, hash }) => {
    let query = knex.select("*").from("vehicle_year");

    if (id) {
      query.where("id", id);
    }

    if(hash){
      query.where("hash",hash);
    }

    return query.first();
  },

  getVYear: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "vy.*",
      ]).from("vehicle_year as vy");

      
      let query_total = await knex(query.as("wd"))
      .count("* as total")
      .first();
     
      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

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

  createVYear: async ({ year }) => {
    try {
      let data = await knex("vehicle_year").insert({
        year,
        hash:String(ObjectID(Date.now()))
      }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateVYear: async ({ id, year }) => {
    try {
      let data = await knex("vehicle_year").where({ hash:id }).update({ year }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteVYear: async ({ id }) => {
    try {
      let data = await knex("vehicle_year").where({ hash:id }).del().returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
