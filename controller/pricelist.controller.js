const pricelist_model=require("../model/pricelist.model.js");
const response = require("../helper/response");

module.exports={

   init:async(req,res,next)=>{
        try {
            let data=await pricelist_model.init();

            return response.ok(data,res)
        }catch(error){
            console.log(error);
            return response.error({},res,error.message);
        }
   }

};