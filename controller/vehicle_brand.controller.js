const vehicle_brand_model = require("../model/vehicle_brand.model.js");
const response = require("../helper/response");

module.exports = {
  getAllBrand: async (req, res, next) => {
    try {
      let data = await vehicle_brand_model.getAllBrand({
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

  getBrand: async (req, res, next) => {
    try {
      let data = await vehicle_brand_model.getBrand({
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

  createBrand: async (req, res, next) => {
    try {
      let { name } = req.body;
      let data = await vehicle_brand_model.createBrand({ name });
      if (data.length == 0) {
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data[0] : {};
        return response.ok(
          {
            data,
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

  getBrandById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_brand_model.getBrandById({ hash: id });

      if (!data) {
        return response.notFound(
          {
            code: "404",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data : {};
        return response.ok(
          {
            data,
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

  updateBrand: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { name } = req.body;
      let data = await vehicle_brand_model.updateBrand({ id, name });
      if (data.length == 0) {
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data[0] : {};

        return response.ok(
          {
            data,
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

  deleteBrand: async (req, res, next) => {
    try {
      let { id } = req.params;
      let data = await vehicle_brand_model.deleteBrand({ id });
      if (data.length == 0) {
        return response.error(
          {
            code: "4046",
            message: "Data not found",
          },
          res
        );
      } else {
        data = data ? data[0] : {};
        return response.ok(
          {
            data,
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
};
