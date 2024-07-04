/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const hashing=require("../../helper/hashing");


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('users').del();
    await knex('vehicle_model').insert([
      {
        id:1,
        hash:"6685fb4559d2e0ed6c000000",
        name:"Sporty",
        vehicle_type_id:1
      },
      {
        id:2,
        hash:"6685fb4dcf192fde27000000",
        name:"Bebek",
        vehicle_type_id:1
      }
    ]);
  
  };
  
