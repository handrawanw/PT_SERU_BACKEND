/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("pricelist",function(table){
      table.increments();
      table.string("hash",32).notNullable();
      table.string("code",6).defaultTo(null);
      table.integer("price").defaultTo(0);
      table.integer("vehicle_year_id").unsigned().references("id").inTable("vehicle_year").notNullable();
      table.integer("vehicle_model_id").unsigned().references("id").inTable("vehicle_model").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.smallint("is_deleted").defaultTo(0);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pricelist");
  };
  