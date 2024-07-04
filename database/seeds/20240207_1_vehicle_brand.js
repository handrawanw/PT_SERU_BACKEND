/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const hashing=require("../../helper/hashing");


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('vehicle_brand').del();
    await knex('vehicle_brand').insert([
      {
        id:1,
        hash:"6685faf052f45de9e2000000",
        name:"Yamaha",
      },
      {
        id:2,
        hash:"6685fb02036c77bd0b000000",
        name:"Honda",
      }
    ]);
  
  };
  
