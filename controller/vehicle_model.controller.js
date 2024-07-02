const vehicle_model_model=require("../model/vehicle_model.model.js");
const response = require("../helper/response");

module.exports={

   init:async(req,res,next)=>{
        try {
            let data=await vehicle_model_model.init();

            return response.ok(data,res)
        }catch(error){
            console.log(error);
            return response.error({},res,error.message);
        }
   }

};