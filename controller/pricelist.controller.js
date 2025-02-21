const pricelist_model = require("../model/pricelist.model.js");
const vehicle_year_model = require("../model/vehicle_year.model.js");
const vehicle_model_model = require("../model/vehicle_model.model.js");
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

  getPriceListById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await pricelist_model.getPriceListById({ hash:id });
      if(!data){

        return response.error(
          {
            code: "4003",
            message: "Pricelist not found",
          },
          res
        );
      }else{
        return response.ok({data}, res);
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

  createPriceList: async (req, res, next) => {
    try {
      let { price, vehicle_year_id, vehicle_model_id } = req.body;

      let codePL = await pricelist_model.codePL();
      console.log(codePL, "codePL");
      let checkVehicleYear = await vehicle_year_model.getYearById({
        id: vehicle_year_id,
      });

      if (!checkVehicleYear) {
        return response.error(
          {
            code: "4004",
            message: "Vehicle year not found",
          },
          res
        );
      }

      let checkVehicleModel = await vehicle_model_model.getModelById({
        id: vehicle_model_id,
      });

      if (!checkVehicleModel) {
        return response.error(
          {
            code: "4005",
            message: "Vehicle model not found",
          },
          res
        );
      }

      let data = await pricelist_model.createPriceList({
        code: codePL,
        price,
        vehicle_year_id,
        vehicle_model_id,
      });

      if(data.length==0){
        return response.error(
          {
            code: "4006",
            message: "Failed to create pricelist",
          },
          res
        );
      }else{
        data = data ? data[0] : {};
        return response.ok({data}, res);
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

  updatePriceList: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { price, vehicle_year_id, vehicle_model_id } = req.body;

      let payload = {};

      if (price) payload.price = price;
      if (vehicle_year_id) payload.vehicle_year_id = vehicle_year_id;
      if (vehicle_model_id) payload.vehicle_model_id = vehicle_model_id;
      if (vehicle_year_id) {
        let checkVehicleYear = await vehicle_year_model.getYearById({
          id: vehicle_year_id,
        });

        if (!checkVehicleYear) {
          return response.error(
            {
              code: "4004",
              message: "Vehicle year not found",
            },
            res
          );
        }
      }

      if (vehicle_model_id) {
        let checkVehicleModel = await vehicle_model_model.getModelById({
          id: vehicle_model_id,
        });

        if (!checkVehicleModel) {
          return response.error(
            {
              code: "4005",
              message: "Vehicle model not found",
            },
            res
          );
        }
      }

      let data = await pricelist_model.updatePriceList({ id, ...payload });
      if(data.length==0){
        return response.error(
          {
            code: "4007",
            message: "Failed to update pricelist",
          },
          res
        );
      }else{
        data = data ? data[0] : {};
        return response.ok({data}, res);
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

  deletePriceList: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await pricelist_model.deletePriceList({ id });

      if(data.length==0){
        return response.error(
          {
            code: "4008",
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
        if(error.hasOwnProperty("code")&&error.code == "23503"){
          return response.error(
            {
              code: "4046",
              message: "Data cannot be deleted because it is used in other tables",
            },
            res
          );
        }else{
          return response.error(
            {
              code: "9998",
              message: error.message,
            },
            res
          );
        }
      } else {
        if(error.hasOwnProperty("code")&&error.code == "23503"){
          return response.error(
            {
              code: "4046",
              message: "Data cannot be deleted because it is used in other tables",
            },
            res
          );
        }else{
          return response.error(
            {
              code: "9999",
              message: "Ops... we have a problem, please try again later!",
            },
            res
          );
        }
      }
    }
  },
};
