const vehicle_type_model = require("../model/vehicle_type.model.js");
const vehicle_brand_model = require("../model/vehicle_brand.model.js");
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

  getVType: async (req, res, next) => {
    try {
      let data = await vehicle_type_model.getVType({
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
      let brand = await vehicle_type_model.getBrandById({ id: brand_id });
      if(brand){
        let data = await vehicle_type_model.createType({ name, brand_id });
        data = data ? data[0] : {};
        return response.ok(data, res);
      }else{
        return response.error(
          {
            code: "4046",
            message: "Brand not found",
          },
          res
        );
      }
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
      if(brand_id){
        let brand = await vehicle_brand_model.getBrandById({ id: brand_id });
        if(!brand){
          return response.error(
            {
              code: "4046",
              message: "Brand not found",
            },
            res
          );
        }
      }else{
        let data = await vehicle_type_model.updateType({ id, ...payload });
        if(data.length === 0){
          return response.error(
            {
              code: "4046",
              message: "Data not found",
            },
            res
          );
        }else{
          data = data ? data[0] : {};
          return response.ok(data, res);
        }
      }

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
      if(data.length === 0){
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      }else{
        data = data ? data[0] : {};
        return response.ok(data, res);
      }
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
