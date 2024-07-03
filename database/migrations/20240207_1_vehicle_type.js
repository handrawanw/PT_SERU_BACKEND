/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("vehicle_type",function(table){
      table.increments();
      table.string("hash",32).notNullable();
      table.text("name").defaultTo(null);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("vehicle_brand_id").unsigned().references("id").inTable("vehicle_brand").notNullable();// nama column di table ini adalah vehicle_brand_id 
      table.smallint("is_deleted").defaultTo(0);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("vehicle_type");
  };
  