const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  
  getAllBrand: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "vb.*",
        "vb.hash as id",
        knex.raw("md5(vb.hash) as hash"),
      ]).from("vehicle_brand as vb");

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

  getBrand: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "vb.*",
      ]).from("vehicle_brand as vb");

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

  getBrandById: async ({ id, hash }) => {
    let query = knex.select("*").from("vehicle_brand");

    if (id) {
      query.where("id", id);
    }

    if(hash){
      query.where("hash",hash);
    }

    return query.first();
  },

  createBrand: async ({ name }) => {
    try {
      let data = await knex("vehicle_brand").insert({
        name,
        hash:String(ObjectID(Date.now()))
      }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateBrand: async ({ id, name }) => {
    try {
      let data = await knex("vehicle_brand").where({ hash:id }).update({ name }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteBrand: async ({ id }) => {
    try {
      let data = await knex("vehicle_brand").where({ hash:id }).del().returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
