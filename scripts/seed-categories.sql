-- Clean up categories table and add proper categories
-- Table structure: id, name, slug, icon, image, is_featured, is_active, created_at, updated_at

DELETE FROM categories;
ALTER TABLE categories AUTO_INCREMENT = 1;

INSERT INTO categories (name, slug, icon, is_featured, is_active, created_at, updated_at) VALUES
('Real Estate', 'real-estate', 'ri-building-line', 1, 1, NOW(), NOW()),
('Automobiles', 'automobiles', 'ri-car-line', 1, 1, NOW(), NOW()),
('Mobiles', 'mobiles', 'ri-smartphone-line', 1, 1, NOW(), NOW()),
('Furniture', 'furniture', 'ri-armchair-line', 1, 1, NOW(), NOW()),
('Electronics', 'electronics', 'ri-tv-line', 1, 1, NOW(), NOW()),
('Beauty', 'beauty', 'ri-brush-line', 0, 1, NOW(), NOW()),
('Jobs', 'jobs', 'ri-briefcase-line', 0, 1, NOW(), NOW()),
('Pets & Animals Accessories', 'pets-animals', 'ri-emotion-happy-line', 1, 1, NOW(), NOW()),
('Learning & Education', 'learning-education', 'ri-book-line', 1, 1, NOW(), NOW()),
('Local Events', 'local-events', 'ri-calendar-event-line', 1, 1, NOW(), NOW()),
('Services', 'services', 'ri-service-line', 1, 1, NOW(), NOW());

-- Verify
SELECT id, name, slug, is_featured, is_active FROM categories ORDER BY id;
