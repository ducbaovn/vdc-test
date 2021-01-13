import * as Knex from "knex";
import { PRODUCTS_TABLE_SCHEMA } from "../models";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME, (table) => {
    table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND, 255).nullable();
    table.string(PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR, 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(PRODUCTS_TABLE_SCHEMA.TABLE_NAME, (table) => {
    table.dropColumn(PRODUCTS_TABLE_SCHEMA.FIELDS.BRAND);
    table.dropColumn(PRODUCTS_TABLE_SCHEMA.FIELDS.COLOR);
  });
}
