-- Add JSON column for product attributes
-- This allows flexible storage of category-specific data

USE marketplace_db;

-- Add the column
ALTER TABLE products 
ADD COLUMN product_attributes JSON DEFAULT NULL 
AFTER description;

-- Verify the column was added
DESCRIBE products;

-- Example of how to query JSON data:
-- SELECT * FROM products 
-- WHERE JSON_EXTRACT(product_attributes, '$.specs.storage') = '256GB';

-- Example of how to update JSON data:
-- UPDATE products 
-- SET product_attributes = JSON_OBJECT(
--     'specs', JSON_OBJECT(
--         'model', 'iPhone 15',
--         'storage', '256GB',
--         'age', '6 months'
--     )
-- )
-- WHERE id = 1;
