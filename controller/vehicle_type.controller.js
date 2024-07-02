const vehicle_type_model=require("../model/vehicle_type.model.js");
const response = require("../helper/response");

module.exports={

   init:async(req,res,next)=>{
        try {
            let data=await vehicle_type_model.init();

            return response.ok(data,res)
        }catch(error){
            console.log(error);
            return response.error({},res,error.message);
        }
   }

};