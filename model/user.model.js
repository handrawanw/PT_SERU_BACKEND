const knex=require("../database/knex");

module.exports={

    getAccount:async({id,username})=>{
        let query=knex.select("*").from("users");

        if(id){
            query.where("id",id);
        }

        if(username){
            query.where("username",username);
        }

        return query.first();
    },

    createAccount:async({name,username,password})=>{
        return knex("user").insert({name,username,password});
    },

    updatePassword: async ({ user_id, password }) => {
        await knex('user').update({ password }).where({ 'id': user_id });
    }

};