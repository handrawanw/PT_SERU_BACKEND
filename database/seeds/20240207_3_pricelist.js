/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('pricelist').del();
    await knex('pricelist').insert([
      {
        id:1,
        hash:"6685fbb565aa7625ce000000",
        code:"PL-0000000000001",
        price:18500000,
        vehicle_year_id:1,
        vehicle_model_id:1
      },
      {
        id:2,
        hash:"6685fbba8b9094bd69000000",
        code:"PL-0000000000002",
        price:17500000,
        vehicle_year_id:1,
        vehicle_model_id:2
      }
    ]);
  
  };
  
