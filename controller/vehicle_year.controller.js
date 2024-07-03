const vehicle_year_model = require("../model/vehicle_year.model.js");
const response = require("../helper/response");

module.exports = {
  getAllVYear: async (req, res, next) => {
    try {
      let data = await vehicle_year_model.getAllVYear({
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

  getVYear: async (req, res, next) => {
    try {
      let data = await vehicle_year_model.getVYear({
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

  getYearById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_year_model.getYearById({ hash: id });

      if (data) {
        data = data ? data : {};
        return response.ok({ data }, res);
      } else {
        return response.notFound(
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

  createVYear: async (req, res, next) => {
    try {
      let { year } = req.body;
      let data = await vehicle_year_model.createVYear({ year });

      if(data.length === 0){
        return response.error(
          {
            code: "4044",
            message: "Data not found!",
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

  updateVYear: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { year } = req.body;
      let data = await vehicle_year_model.updateVYear({ id, year });

      if(data.length === 0){
        return response.error(
          {
            code: "4044",
            message: "Data not found!",
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

  deleteVYear: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_year_model.deleteVYear({ id });

      if(data.length === 0){
        return response.error(
          {
            code: "4044",
            message: "Data not found!",
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
