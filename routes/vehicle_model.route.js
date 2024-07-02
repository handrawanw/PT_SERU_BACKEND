const router=require("express").Router();

const controller = require("../controller/vehicle_model.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/vehicle_model.validate.js");
const validate=require("../middleware/validate_joi.js");

router.post("/init",auth.authjwt,validate.body(schemas.init),controller.init);

module.exports=router;
