/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const hashing=require("../../helper/hashing");


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('vehicle_year').del();
    await knex('vehicle_year').insert([
      {
        id:1,
        hash:"6685fb9cc7c37ea211000000",
        year:"2024"
      },
      {
        id:2,
        hash:"6685fba2b08e5770a7000000",
        year:"2023"
      }
    ]);
  
  };
  
