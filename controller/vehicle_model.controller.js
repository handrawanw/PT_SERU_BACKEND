const vehicle_model = require("../model/vehicle_model.model.js");
const response = require("../helper/response");

module.exports = {
  getAllModel: async (req, res, next) => {
    try {
      let data = await vehicle_model.getAllModel({
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

  getVModel: async (req, res, next) => {
    try {
      let data = await vehicle_model.getVModel({
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

  getModelById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_model.getModelById({ hash: id });

      if (data) {
        data = data ? data : {};
        return response.ok({ data }, res);
      } else {
        return response.error(
          {
            code: "4045",
            message: "Model not found",
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

  createModel: async (req, res, next) => {
    try {
      let { name, type_id } = req.body;
      let data = await vehicle_model.createModel({ name, type_id });
      if (data.length === 0) {
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data[0] : {};
        return response.ok({ data }, res);
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

  updateModel: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name, type_id } = req.body;

      let payload = {};

      if (name) payload.name = name;
      if (type_id) payload.type_id = type_id;

      let data = await vehicle_model.updateModel({ id, ...payload });

      if (data.length === 0) {
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data[0] : {};
        return response.ok({ data }, res);
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

  deleteModel: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_model.deleteModel({ id });

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
        return response.ok({data}, res);
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
