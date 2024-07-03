const router=require("express").Router();

const controller = require("../controller/vehicle_brand.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/vehicle_brand.validate.js");
const validate=require("../middleware/validate_joi.js");


router.get("/get",validate.query(schemas.getAllBrand),controller.getBrand);
router.get("/",auth.authjwt,validate.query(schemas.getAllBrand),controller.getAllBrand);
router.get("/:id",auth.authjwt,controller.getBrandById);
router.post("/create",auth.authjwt,validate.body(schemas.createBrand),controller.createBrand);
router.put("/update/:id",auth.authjwt,validate.body(schemas.updateBrand),controller.updateBrand);
router.delete("/delete/:id",auth.authjwt,controller.deleteBrand);

module.exports=router;
