const router=require("express").Router();

const controller = require("../controller/vehicle_model.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/vehicle_model.validate.js");
const validate=require("../middleware/validate_joi.js");

router.get("/",auth.authjwt,validate.query(schemas.getAllModel),controller.getAllModel);
router.post("/create",auth.authjwt,validate.body(schemas.createModel),controller.createModel);
router.put("/update/:id",auth.authjwt,validate.body(schemas.updateModel),controller.updateModel);
router.delete("/delete/:id",auth.authjwt,controller.deleteModel);

module.exports=router;