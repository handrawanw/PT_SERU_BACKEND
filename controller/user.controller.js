const user_model = require("../model/user.model.js");
const response = require("../helper/response");

const hashing = require("../helper/hashing.js");
const jwt_token = require("../helper/jwt_token.js");

module.exports = {
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      let account = await user_model.getAccount({ username });

      if (!account) {
        // account not found
        return response.unauthorized(
          {
            code: "4000",
            message: "Username or Password not match!",
          },
          res
        );
      } else {
        let correct_password = await hashing.checkPass(
          password,
          account.password
        );
        if (correct_password) {
          // password match
          let token = await jwt_token.generateToken({
            id: account.id,
            username: account.username,
            is_admin: account.is_admin,
          });

          return response.ok(
            {
              code: "0000",
              message: "Login Success!",
              access_token: token,
              token_type: "bearer",
            },
            res
          );
        } else {
          // password not match
          return response.unauthorized(
            {
              code: "4501",
              message: "Password and Username not match!",
            },
            res
          );
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

  register: async (req, res, next) => {
    try {
      let { name, username, password } = req.body;

      let checkUsername = await user_model.getAccount({ username });

      if (checkUsername) {
        // account already exist
        return response.duplicated(
          {
            code: "4001",
            message: "Username already exist!",
          },
          res
        );
      } else {
        let hashed_password = await hashing.hashPass(password);

        let new_account = await user_model.createAccount({
          name,
          username,
          password: hashed_password,
          is_admin: 0,
        });

        return response.created(
          {
            code: "4003",
            message: "Register Success!",
            data: new_account[0],
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

  updatePassword: async (req, res, next) => {
    try {
      let { new_password, password } = req.body;

      if (!password) {
        return response.bad(
          {
            code: "5836",
            header: "Error",
            message: "Password must be filled",
          },
          res
        );
      } else if (!new_password) {
        return response.bad(
          {
            code: "5837",
            message: "New Password must be filled",
          },
          res
        );
      } else if (password == new_password) {
        return response.error(
          {
            code: "5838",
            message: "New Password cannot be the same as the old password",
          },
          res
        );
      } else if (new_password.length < 7) {
        return response.error(
          {
            code: "5839",
            message: "New password must be at least 7 characters long",
          },
          res
        );
      } else {
        let account = await user_model.getAccount({
          id: req.decoded.id,
        });
        if (!account) {
          return response.notFound(
            {
              code: "4000",
              message: "User not found",
            },
            res
          );
        }
        let correct_password = await hashing.checkPass(
          password,
          account.password
        );
        if (!correct_password) {
          return response.error(
            {
              code: "5840",
              message: "Old password is incorrect",
            },
            res
          );
        } else {
          // console.log("masuk", req.decoded.id, hashing.hashPass(new_password));
          await user_model.updatePassword({
            user_id: req.decoded.id,
            password: hashing.hashPass(new_password),
          });
          return response.ok(
            {
              code: "5841",
              message: "Password successfully changed",
            },
            res
          );
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

  getAllUser: async (req, res, next) => {
    try {
      let { page, limit } = req.query;
      let data = await user_model.getAllUser({ page, limit });
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
    }
  },

  getUserById: async (req, res, next) => {
    try {
      let { id } = req.params;
      let result = await user_model.getAccount({ hash:id });
      if (!result) {
        return response.notFound(
          {
            code: "4000",
            message: "User not found",
          },
          res
        );
      }
      return response.ok(result, res);
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

  createUser: async (req, res, next) => {
    try {
      let { name, username, password } = req.body;

      let checkUsername = await user_model.getAccount({ username });

      if (checkUsername) {
        // account already exist
        return response.bad(
          {
            code: "4001",
            message: "Username already exist!",
          },
          res
        );
      } else {
        let hashed_password = await hashing.hashPass(password);

        let new_account = await user_model.createAccount({
          name,
          username,
          password: hashed_password,
          is_admin: 1
        });

        return response.created(
          {
            code: "4003",
            message: "Register Success!",
            data: new_account[0],
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


  updateUser: async (req, res, next) => {
    try {
      const { id }  = req.params;
      let { name, username, password } = req.body;
      let account = await user_model.getAccount({ hash:id });
      if (!account) {
        return response.notFound(
          {
            code: "4000",
            message: "User not found",
          },
          res
        );
      }
      let payload = {};
      if (name) payload.name = name;
      if (username) payload.username = username;
      if (password) payload.password = hashing.hashPass(password);
      let update = await user_model.updateUser({ id, ...payload});
      if(update.length === 0){
        return response.error(
          {
            code: "4006",
            message: "User failed to update",
          },
          res
        );
      }else{
        return response.ok(
          {
            code: "4004",
            message: "User successfully updated",
            data: update[0]
          },
          res
        );
      }
    }catch(error){
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


  deleteUser: async (req, res, next) => {
    try {
      let { id } = req.params;
      let account = await user_model.getAccount({ hash: id});
      if (!account) {
        return response.notFound(
          {
            code: "4000",
            message: "User not found",
          },
          res
        );
      }
      let data=await user_model.deleteUser({ id });
      data = []
      if(data === 0){
        return response.error(
          {
            code: "4006",
            message: "User failed to delete",
          },
          res
        );
      }else{
        return response.ok(
          {
            code: "4005",
            message: "User successfully deleted",
          },
          res
        );
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
