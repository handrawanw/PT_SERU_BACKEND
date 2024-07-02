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
          member.password
        );
        if (correct_password) {
          // password match
          let token = await jwt_token.generateToken({
            id: account.id,
            username: account.username,
          });

          return response.ok(
            {
              code: "4500",
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
        return response.badRequest(
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
        });

        return response.created(
          {
            code: "4003",
            message: "Register Success!",
            data: new_account,
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
          await users_model.updatePassword({
            memberid: req.decoded.id,
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
};
