import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`DELETE FROM products;`)

    // Inserts seed entries
    await knex.raw(`
      INSERT INTO products
        (id, is_deleted, name, price, description, brand, color)
          VALUES
        ('0aaf3fa0-6de2-478b-b03a-ef1c61805e61', 0, 'iphone 11 pro max', 33000000, 'best phone', 'apple', 'black'),
        ('ae97dc1b-cbf5-45a8-8814-83afdbf80ad5', 0, 'iphone X', 10000000, NULL, 'apple', 'white'),
        ('74c9f662-f560-422c-aacb-adfd711c5edf', 0, 'iphone XS', 11000000, NULL, 'apple', 'black'),
        ('e739d32f-8579-4d18-9329-339e0effa7df', 1, 'iphone XS Max', 14000000, NULL, 'apple', NULL),
        ('b99e419a-ecae-4b21-8d4b-709ae302954e', 0, 'iphone 11', 14200000, NULL, 'apple', 'green'),
        ('48f3df85-2866-4092-89ca-1deda0994bbf', 0, 'iphone 11 pro', 18000000, NULL, 'apple', 'grey'),
        ('1fc91b1f-ff81-43f1-892c-f848ba9443cd', 0, 'iphone 12', 21000000, NULL, 'apple', 'red'),
        ('b9ee19ae-96b6-43e4-acc4-7e81d2ceb694', 0, 'iphone 12 mini', 18000000, NULL, 'apple', 'green'),
        ('62071a17-2f0c-4c81-b99e-8e700afe30e7', 0, 'iphone 12 pro', 27000000, NULL, 'apple', 'white'),
        ('33f1cf1c-c1d3-4b09-80ee-645ad5498efb', 0, 'iphone 12 pro max', 31500000, NULL, 'apple', 'black'),
        ('2402b762-9836-4fca-8acf-12aa6431af5c', 0, 'samsung note 20', 23000000, 'worse than iphone', 'samsung', 'black'),
        ('f8ae3bcd-4575-4fec-8a6b-96a4bc398839', 1, 'samsung note 20', 23000000, 'worse than iphone', NULL, NULL),
        ('30e020a7-ccaf-4c53-ab06-8cf8d0ca3d3c', 0, 'samsung note 20 ultra', 27000000, NULL, 'samsung', 'blue'),
        ('d671879a-e74d-4268-a49d-0cd89659e8af', 0, 'samsung galaxy S20+', 18000000, NULL, 'samsung', 'white'),
        ('8bba07e3-6981-43e6-9e0c-e3988a6caad4', 0, 'samsung galaxy S20', 15000000, NULL, 'samsung', 'green'),
        ('518cff1c-7799-4a24-80ac-5d4d17eaec70', 0, 'samsung note 10+', 16500000, NULL, 'samsung', 'black'),
        ('4225c5a7-1aaa-49ee-9827-4def673f3f9f', 0, 'samsung note 10 lite', 11000000, NULL, 'samsung', 'silver');
    `)
};