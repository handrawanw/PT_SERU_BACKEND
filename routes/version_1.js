const router=require("express").Router();

router.use("/user",require("./user.route"));
router.use("/vehicle_brand",require("./vehicle_brand.route"));
router.use("/vehicle_year",require("./vehicle_year.route"));
// router.use("/vehicle_type",require("./vehicle_type.route"));
// router.use("/vehicle_model",require("./vehicle_model.route"));
// router.use("/pricelist",require("./pricelist.route"));

module.exports=router;