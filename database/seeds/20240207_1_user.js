/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const hashing=require("../../helper/hashing");


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('users').del();
    await knex('users').insert([
      {
        id:1,
        hash:"6685fc3b181615ec58000000",
        name:"admin",
        username:"admin",
        is_admin:1,
        password:hashing.hashPass("admin#@!")
      },
      {
        id:2,
        hash:"6685fc51994db01596000000",
        name:"Handrawan",
        username:"handrawan",
        is_admin:0,
        password:hashing.hashPass("admin#@!")
      }
    ]);
  
  };
  
