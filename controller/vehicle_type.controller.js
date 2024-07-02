const vehicle_type_model = require("../model/vehicle_type.model.js");
const response = require("../helper/response");

module.exports = {
  getAllType: async (req, res, next) => {
    try {
      let data = await vehicle_type_model.getAllType({
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

  createType: async (req, res, next) => {
    try {
      let { name, brand_id } = req.body;
      let data = await vehicle_type_model.createType({ name, brand_id });

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

  updateType: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name, brand_id } = req.body;

      let payload = {};

      if(name) payload.name = name;
      if(brand_id) payload.brand_id = brand_id;

      let data = await vehicle_type_model.updateType({ id, ...payload });

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

  deleteType: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_type_model.deleteType({ id });

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
