const pricelist_model = require("../model/pricelist.model.js");
const response = require("../helper/response");

module.exports = {
  getAllPriceList: async (req, res, next) => {
    try {
      let data = await pricelist_model.getAllPriceList({
        limit: req.query.limit,
        page: req.query.page,
      });

      return response.ok(data, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            code: "9998",
            message: error.message,
          },
          res
        );
      } else {
        return response.error(
          {
            code: "9999",
            message: "Ops... we have a problem, please try again later!",
          },
          res
        );
      }
    }
  },

  createPriceList: async (req, res, next) => {
    try {
      let { price, vehicle_year_id, vehicle_model_id } = req.body;

      let codePL = await pricelist_model.codePL();

      let data = await pricelist_model.createPriceList({
        code: codePL,
        price,
        vehicle_year_id,
        vehicle_model_id
      });
      
      return response.ok(data, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            code: "9998",
            message: error.message,
          },
          res
        );
      } else {
        return response.error(
          {
            code: "9999",
            message: "Ops... we have a problem, please try again later!",
          },
          res
        );
      }
    }
  },

  updatePriceList: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { price, vehicle_year_id, vehicle_model_id } = req.body;

      let payload = {};

      if (price) payload.price = price;
      if (vehicle_year_id) payload.vehicle_year_id = vehicle_year_id;
      if (vehicle_model_id) payload.vehicle_model_id = vehicle_model_id;

      let data = await pricelist_model.updatePriceList({ id, ...payload });

      return response.ok(data, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            code: "9998",
            message: error.message,
          },
          res
        );
      } else {
        return response.error(
          {
            code: "9999",
            message: "Ops... we have a problem, please try again later!",
          },
          res
        );
      }
    }
  },

  deletePriceList: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await pricelist_model.deletePriceList({ id });

      return response.ok(data, res);
    } catch (error) {
      console.log(error.stack);
      if (process.env.NODE_ENV === "development") {
        return response.error(
          {
            code: "9998",
            message: error.message,
          },
          res
        );
      } else {
        return response.error(
          {
            code: "9999",
            message: "Ops... we have a problem, please try again later!",
          },
          res
        );
      }
    }
  },
};
