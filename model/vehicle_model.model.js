const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  getAllModel: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({ page, limit });

      let query = knex
        .select([
          "vm.*",
          "vm.hash as id",
          knex.raw("md5(vm.hash) as hash"),
          "vt.name as type_name",
          "vt.hash as type_id",
        ])
        .from("vehicle_model as vm");

      query.leftJoin("vehicle_type as vt", "vm.vehicle_type_id", "vt.id");

      let query_total = await knex(query.as("wd")).count("* as total").first();

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
        data: datas,
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getVModel: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({ page, limit });

      let query = knex.select(["vm.*"]).from("vehicle_model as vm");

      let query_total = await knex(query.as("wd")).count("* as total").first();

      if (limit && limit != "all") {
        query.offset(offset);
        query.limit(limit);
      }

      let datas = await query;

      let result = {
        total_data: parseInt(query_total.total),
        data: datas,
      };

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getModelById: async ({ id, hash }) => {
    let query = knex.select("*").from("vehicle_model");

    if (id) {
      query.where("id", id);
    }

    if (hash) {
      query.where("hash", hash);
    }

    return query.first();
  },

  createModel: async ({ name, type_id }) => {
    try {
      let data = await knex("vehicle_model")
        .insert({
          name,
          vehicle_type_id: type_id,
          hash: String(ObjectID(Date.now())),
        })
        .returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateModel: async ({ id, name, type_id }) => {
    try {
      let data = await knex("vehicle_model")
        .where({ hash: id })
        .update({ name, vehicle_type_id: type_id })
        .returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteModel: async ({ id }) => {
    try {
      let data = await knex("vehicle_model")
        .where({ hash: id })
        .del()
        .returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
