const knex = require("../database/knex");

const query_helper = require("../helper/query_helper");

const ObjectID = require("bson-objectid");

module.exports = {
  
  getAllPriceList: async ({ limit, page } = { limit: 0, page: 0 }) => {
    try {
      let offset = query_helper.parsePageToOffset({page, limit});

      let query = knex.select([
        "pl.price",
        "pl.code",
        "pl.hash as id",
        knex.raw("md5(pl.hash) as hash"),
        "vy.year",
        "vm.name as model",
        "pl.created_at",
        "pl.updated_at",
      ]).from("pricelist as pl");

      query.leftJoin("vehicle_year as vy", "pl.vehicle_year_id", "vy.id");
      query.leftJoin("vehicle_model as vm", "pl.vehicle_model_id", "vm.id");

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

  createPriceList: async ({ code, price, vehicle_year_id, vehicle_model_id }) => {
    try {
      let data = await knex("pricelist").insert({
        code, price, vehicle_year_id,vehicle_model_id,
        hash:String(ObjectID(Date.now()))
      }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updatePriceList: async ({ id, price, vehicle_year_id, vehicle_model_id }) => {
    try {
      let data = await knex("pricelist").where({ hash:id }).update({ price, vehicle_year_id, vehicle_model_id }).returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deletePriceList: async ({ id }) => {
    try {
      let data = await knex("pricelist").where({ hash:id }).del().returning("*");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  codePL: async () => {
    try {
        let code = "PL-0000000000001" ;
        const result = await knex("pricelist").max("code as code");
        if(result.length>0&&result[0].code){
            let code_number = parseInt(result[0].code.split("-")[1]) + 1;
            code = `PL-${code_number.toString().padStart(13, "0")}`;
        }
        return code;
    }catch(error){
        console.error(error);
        throw error;
    }
},
};
