/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const hashing=require("../../helper/hashing");


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('vehicle_type').del();
    await knex('vehicle_type').insert([
      {
        id:1,
        hash:"6685fb2456bb6e0e46000000",
        name:"Sepeda Motor",
        vehicle_brand_id:1
      },
      {
        id:2,
        hash:"6685fb2b79dfc05811000000",
        name:"Mobil",
        vehicle_brand_id:1
      }
    ]);
  
  };
  
