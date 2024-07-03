const router=require("express").Router();

const controller = require("../controller/vehicle_type.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/vehicle_type.validate.js");
const validate=require("../middleware/validate_joi.js");

router.get("/get",auth.authjwt,validate.query(schemas.getAllType),controller.getVType);
router.get("/",auth.authjwt,validate.query(schemas.getAllType),controller.getAllType);
router.get("/:id",auth.authjwt,controller.getTypeById);
router.post("/create",auth.authjwt,validate.body(schemas.createType),controller.createType);
router.patch("/update/:id",auth.authjwt,validate.body(schemas.updateType),controller.updateType);
router.delete("/delete/:id",auth.authjwt,controller.deleteType);

module.exports=router;
