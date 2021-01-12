import * as Knex from "knex";
import { PRODUCTS_TABLE_SCHEMA } from "../models";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME, (table) => {
    table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.ID, 255).notNullable().primary();
    table.dateTime(PRODUCTS_TABLE_SCHEMA.FIELDS.CREATED_AT).notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table
      .dateTime(PRODUCTS_TABLE_SCHEMA.FIELDS.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.boolean(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_ENABLE).notNullable().defaultTo(1);
    table.boolean(PRODUCTS_TABLE_SCHEMA.FIELDS.IS_DELETED).notNullable().defaultTo(0);
    table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.NAME, 255).notNullable();
    table.integer(PRODUCTS_TABLE_SCHEMA.FIELDS.PRICE).notNullable();
    table.text(PRODUCTS_TABLE_SCHEMA.FIELDS.DESCRIPTION).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME);
}
