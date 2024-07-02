const router=require("express").Router();

const controller = require("../controller/vehicle_year.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/vehicle_year.validate.js");
const validate=require("../middleware/validate_joi.js");

router.get("/",auth.authjwt,validate.query(schemas.getAllVYear),controller.getAllVYear);
router.post("/create",auth.authjwt,validate.body(schemas.createVYear),controller.createVYear);
router.put("/update/:id",auth.authjwt,validate.body(schemas.updateVYear),controller.updateVYear);
router.delete("/delete/:id",auth.authjwt,controller.deleteVYear);

module.exports=router;
