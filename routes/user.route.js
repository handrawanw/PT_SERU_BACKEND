const router=require("express").Router();

const controller = require("../controller/user.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/user.validate.js");
const validate=require("../middleware/validate_joi.js");

router.post("/login",validate.body(schemas.login),controller.login);
router.post("/register",validate.body(schemas.register),controller.register);
router.patch("/update_password",auth.authjwt,validate.body(schemas.update_password),controller.updatePassword);

module.exports=router;
