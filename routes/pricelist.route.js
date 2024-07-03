const router=require("express").Router();

const controller = require("../controller/pricelist.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/pricelist.validate.js");
const validate=require("../middleware/validate_joi.js");

router.get("/",auth.authjwt,validate.query(schemas.getAllPriceList),controller.getAllPriceList);
router.post("/create",auth.authjwt,validate.body(schemas.createPriceList),controller.createPriceList);
router.patch("/update/:id",auth.authjwt,validate.body(schemas.updatePriceList),controller.updatePriceList);
router.delete("/delete/:id",auth.authjwt,controller.deletePriceList);

module.exports=router;