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
        name:"superadmin",
        username:"admin",
        is_admin:1,
        password:hashing.hashPass("admin#@!")
      },
      {
        id:2,
        name:"Handrawan",
        username:"handrawan",
        is_admin:1,
        password:hashing.hashPass("admin#@!")
      }
    ]);
  
  };
  
