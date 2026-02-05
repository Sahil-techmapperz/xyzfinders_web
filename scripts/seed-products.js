/**
 * Script to seed mock products data into database
 * Usage: node scripts/seed-products.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

// Helper to download and convert image to base64
async function urlToBase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Failed to fetch image: ${url}`);
            return null;
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64');
    } catch (error) {
        console.warn(`Error fetching image ${url}:`, error.message);
        return null;
    }
}

// Category name to ID mapping (based on seeded categories)
const CATEGORY_MAP = {
    'Real Estate': 1,
    'Automobiles': 2,
    'Mobiles': 3,
    'Pets & Animals Accessories': 8,
    'Learning & Education': 9,
    'Local Events': 10,
    'Services': 11
};

// Will be set dynamically from database
let DEFAULT_LOCATION_ID = 1;
let DEFAULT_USER_ID = 1;

async function seedProducts() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'marketplace_db'
        });

        console.log('✓ Connected to database');

        // Get a valid user_id
        const [users] = await connection.execute('SELECT id FROM users LIMIT 1');
        if (users.length > 0) {
            DEFAULT_USER_ID = users[0].id;
            console.log(`✓ Using user_id: ${DEFAULT_USER_ID}`);
        } else {
            console.error('❌ No users found in database. Please create a user first.');
            process.exit(1);
        }

        // Get a valid location_id
        const [locations] = await connection.execute('SELECT id FROM locations LIMIT 1');
        if (locations.length > 0) {
            DEFAULT_LOCATION_ID = locations[0].id;
            console.log(`✓ Using location_id: ${DEFAULT_LOCATION_ID}`);
        }

        // Delete existing products
        await connection.execute('DELETE FROM product_images WHERE 1=1');
        await connection.execute('DELETE FROM products WHERE 1=1');
        await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
        console.log('✓ Cleared existing products');

        let insertedCount = 0;

        // Helper function to insert product
        const insertProduct = async (data, categoryId, attributes = null) => {
            let price = 0;

            // Parse price from various formats
            if (data.price) {
                const priceStr = typeof data.price === 'string' ? data.price : String(data.price);
                const cleanPrice = priceStr.replace(/[₹,\/\-\s]/g, '').replace('onwards', '').replace('Free', '0').trim();
                price = parseFloat(cleanPrice) || 0;
            } else if (data.fees) {
                const feesStr = typeof data.fees === 'string' ? data.fees : String(data.fees);
                const cleanFees = feesStr.replace(/[₹,\/\-\s]/g, '').trim();
                price = parseFloat(cleanFees) || 0;
            }

            const insertQuery = `
                INSERT INTO products (
                    user_id, category_id, location_id, title, description, 
                    product_attributes, price, \`condition\`, status, is_featured, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const description = data.description || data.desc || '';
            const location = data.location || 'New Delhi';

            // Extract just city name from location
            const cityMatch = location.match(/([^,]+)(\s*,|\s*$)/);
            const city = cityMatch ? cityMatch[1].trim() : location;

            const fullDescription = description ? description : `${data.title} - Located in ${city}`;

            // Convert attributes to JSON string
            if (attributes && data.location) {
                attributes.location = data.location;
            }
            const attributesJson = attributes ? JSON.stringify(attributes) : null;

            const [result] = await connection.execute(insertQuery, [
                DEFAULT_USER_ID,
                categoryId,
                DEFAULT_LOCATION_ID,
                data.title,
                fullDescription,
                attributesJson,
                price,
                'good',  // condition: 'new','like_new','good','fair','poor'
                'active',
                data.premium ? 1 : 0
            ]);

            const productId = result.insertId;

            // Insert product image if available
            if (data.image) {
                console.log(`  Downloading image for: ${data.title.substring(0, 50)}...`);

                try {
                    const response = await fetch(data.image);
                    const arrayBuffer = await response.arrayBuffer();
                    const imageBuffer = Buffer.from(arrayBuffer);

                    if (imageBuffer) {
                        const imageQuery = `
                            INSERT INTO product_images (
                                product_id, image_data, display_order, is_primary, created_at
                            ) VALUES (?, ?, ?, ?, NOW())
                        `;
                        await connection.execute(imageQuery, [productId, imageBuffer, 0, 1]);
                    }
                } catch (error) {
                    console.warn(`  ⚠️ Failed to fetch image: ${data.image}`);
                }
            }

            insertedCount++;
            console.log(`  ✓ Inserted #${productId}: ${data.title.substring(0, 50)}`);
        };

        // Real Estate - 5 properties
        console.log('\n📦 Inserting Real Estate properties...');
        const properties = [
            {
                title: "Premium 4BHK Apartment for Rent",
                price: "11000",
                location: "Kundeshwari Rd, Kashipur",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
                description: "Spacious 4BHK apartment with modern amenities. Located in a prime area with easy access to markets and schools.",
                premium: true,
                attrs: {
                    specs: {
                        bedroom: 4, kitchen: 1, bathroom: 2,
                        roomType: "Entire Apartment", securityDeposit: "22000", attachedBathroom: "Yes",
                        balcony: "2", updated: "2 days ago", tenants: "Family", furnishing: "Unfurnished"
                    },
                    tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
                    type: "Apartment",
                    amenities: [
                        { icon: "ri-wifi-line", name: "Wifi" },
                        { icon: "ri-car-line", name: "Parking" },
                        { icon: "ri-shield-star-line", name: "Security" }
                    ]
                }
            },
            {
                title: "Premium 2BHK Apartment for Rent",
                price: "11000",
                location: "Kundeshwari Rd, Kashipur",
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
                description: "Fully furnished 2BHK with partition rooms. Ideal for students or small families.",
                premium: true,
                attrs: {
                    specs: {
                        bedroom: 2, kitchen: 1, bathroom: 1,
                        roomType: "Entire Apartment", securityDeposit: "20000", attachedBathroom: "Yes",
                        balcony: "1", updated: "5 days ago", tenants: "Any", furnishing: "Fully Furnished"
                    },
                    tags: ["Room with Partition", "Fullfurnished", "Ready to Shift"],
                    type: "House",
                    amenities: [
                        { icon: "ri-tv-line", name: "TV" },
                        { icon: "ri-fridge-line", name: "Fridge" },
                        { icon: "ri-windy-line", name: "AC" }
                    ]
                }
            },
            {
                title: "High-End Executive Female Bed Space",
                price: "5500",
                location: "Kundeshwari Rd, Kashipur",
                image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
                description: "4 bed sharing PG for girls with all facilities. Safe and secure environment.",
                premium: true,
                attrs: {
                    specs: {
                        sharing: "4 Bed Sharing", bedroom: 1, kitchen: 1, bathroom: 1,
                        roomType: "Shared Room", securityDeposit: "5500", attachedBathroom: "Yes",
                        balcony: "None", updated: "Today", tenants: "Female Only", furnishing: "Fully Furnished"
                    },
                    tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
                    type: "Girls PG",
                    amenities: [
                        { icon: "ri-wifi-line", name: "Wifi" },
                        { icon: "ri-restaurant-line", name: "Food" },
                        { icon: "ri-shirt-line", name: "Laundry" }
                    ]
                }
            },
            {
                title: "Premium 3BHK Apartment for Rent",
                price: "9000",
                location: "Kundeshwari Rd, Kashipur",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
                description: "Semi-furnished spacious apartment. Recently renovated.",
                premium: true,
                attrs: {
                    specs: {
                        bedroom: 3, kitchen: 1, bathroom: 2,
                        roomType: "Entire Apartment", securityDeposit: "18000", attachedBathroom: "Yes",
                        balcony: "1", updated: "1 week ago", tenants: "Family", furnishing: "Semi-Furnished"
                    },
                    tags: ["Spacious Plot", "Semi-furnished", "Ready to Shift"],
                    type: "Apartment",
                    amenities: [
                        { icon: "ri-car-line", name: "Parking" },
                        { icon: "ri-leaf-line", name: "Garden" }
                    ]
                }
            },
            {
                title: "Premium 5BHK Apartment for Rent",
                price: "11000",
                location: "Kundeshwari Rd, Kashipur",
                image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
                description: "Luxury 5BHK with 2 kitchens. Perfect for large families.",
                premium: true,
                attrs: {
                    specs: {
                        bedroom: 5, kitchen: 2, bathroom: 3,
                        roomType: "Entire Villa", securityDeposit: "30000", attachedBathroom: "Yes",
                        balcony: "3", updated: "3 days ago", tenants: "Any", furnishing: "Unfurnished"
                    },
                    tags: ["Spacious Plot", "Fully-furnished", "Ready to Shift"],
                    type: "Apartment",
                    amenities: [
                        { icon: "ri-vip-crown-line", name: "Premium" },
                        { icon: "ri-shield-check-line", name: "Gated" }
                    ]
                }
            }
        ];
        for (const prop of properties) {
            await insertProduct(prop, CATEGORY_MAP['Real Estate'], prop.attrs);
        }

        // Automobiles - 5 cars
        console.log('\n🚗 Inserting Automobiles...');
        const automobiles = [
            { title: "Volvo XC90 T6 Inscription Highline", price: "11000", location: "Kashipur", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80", description: "2016 Volvo XC90 - 164,546 Km, Petrol", premium: true, attrs: { make: "Volvo", model: "XC90", variant: "T6 Inscription Highline", year: "2016", kms: "164,546 Km", fuel: "Petrol", transmission: "Automatic" } },
            { title: "Audi Q3 35 TFSI", price: "255546", location: "Noida", image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80", description: "2018 Audi Q3 - 45,000 Km, Diesel, Mint condition", premium: true, attrs: { make: "Audi", model: "Q3", variant: "35 TFSI", year: "2018", kms: "45,000 Km", fuel: "Diesel", transmission: "Automatic" } },
            { title: "BMW 5 Series 520d Luxury Line", price: "4500000", location: "New Delhi", image: "https://5.imimg.com/data5/SELLER/Default/2022/11/VN/FC/TN/64991677/bmw-5-series-520d-luxury-line.jpeg", description: "2020 BMW 5 Series - 32,000 Km, Diesel", premium: false, attrs: { make: "BMW", model: "5 Series", variant: "520d Luxury Line", year: "2020", kms: "32,000 Km", fuel: "Diesel", transmission: "Automatic" } },
            { title: "Mercedes-Benz C-Class C 220d", price: "3850000", location: "Gurugram", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", description: "2019 Mercedes C-Class - 28,500 Km, Diesel", premium: true, attrs: { make: "Mercedes-Benz", model: "C-Class", variant: "C 220d", year: "2019", kms: "28,500 Km", fuel: "Diesel", transmission: "Automatic" } },
            { title: "Toyota Fortuner 2.8 4x4 AT", price: "3200000", location: "New Delhi", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", description: "2021 Toyota Fortuner - 55,000 Km, Diesel", premium: false, attrs: { make: "Toyota", model: "Fortuner", variant: "2.8 4x4 AT", year: "2021", kms: "55,000 Km", fuel: "Diesel", transmission: "Automatic" } }
        ];
        for (const auto of automobiles) {
            await insertProduct(auto, CATEGORY_MAP['Automobiles'], auto.attrs);
        }

        // Mobiles - 4 phones
        console.log('\n📱 Inserting Mobiles...');
        const mobiles = [
            { title: "iPhone 15 Pro Max 256GB Desert Titanium", price: "95000", location: "New Delhi", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80", description: "Excellent condition, 6 months old, all accessories", premium: true, attrs: { brand: "APPLE", specs: { age: "6 MONTHS", model: "iPhone 15 Pro Max", storage: "256 GB", colour: "Desert Titanium" } } },
            { title: "Samsung Galaxy S24 Ultra 12GB 512GB", price: "89000", location: "New Delhi", image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&q=80", description: "Flagship with AI features and S-Pen", premium: true, attrs: { brand: "SAMSUNG", specs: { age: "3 MONTHS", model: "Galaxy S24 Ultra", storage: "512 GB", colour: "Titanium Black" } } },
            { title: "OnePlus 12 Pro 16GB 256GB", price: "52000", location: "New Delhi", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", description: "Hasselblad camera with fast charging", premium: false, attrs: { brand: "ONEPLUS", specs: { age: "1 YEAR", model: "OnePlus 12 Pro", storage: "256 GB", colour: "Midnight Black" } } },
            { title: "Google Pixel 8 Pro 12GB 256GB", price: "74000", location: "New Delhi", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80", description: "Pure Android with Google Tensor G3", premium: false, attrs: { brand: "GOOGLE", specs: { age: "BRAND NEW", model: "Pixel 8 Pro", storage: "256 GB", colour: "Obsidian" } } }
        ];
        for (const mobile of mobiles) {
            await insertProduct(mobile, CATEGORY_MAP['Mobiles'], mobile.attrs);
        }

        // Pets - 4 listings
        console.log('\n🐾 Inserting Pets & Accessories...');
        const pets = [
            { title: "Golden Retriever Puppies KCI Registered", price: "25000", location: "New Delhi", image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80", description: "45 Days old, KCI registered, first vaccination done", premium: true, attrs: { type: "Dog", specs: { age: "45 Days", breed: "Golden Retriever", gender: "Male/Female", vaccinated: "Yes" } } },
            { title: "Persian Cat Kittens (Doll Face)", price: "12000", location: "New Delhi", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80", description: "2 months old, pure white with blue eyes", premium: true, attrs: { type: "Cat", specs: { age: "2 Months", breed: "Persian", gender: "Male", vaccinated: "No" } } },
            { title: "Large Dog Cage / Crate (Heavy Duty)", price: "4500", location: "New Delhi", image: "https://images.unsplash.com/photo-1598585226456-ccde20937a0c?w=800&q=80", description: "Heavy duty cage - 4x3x3 feet", premium: false, attrs: { type: "Accessory", specs: { age: "New", breed: "Universal", gender: "N/A", vaccinated: "N/A" } } },
            { title: "Pedigree Adult Dog Food 20kg", price: "2800", location: "New Delhi", image: "https://images.unsplash.com/photo-1585846888147-3fe14c130048?w=800&q=80", description: "Unopened bag, chicken & vegetables", premium: false, attrs: { type: "Food", specs: { age: "New", breed: "All Breeds", gender: "N/A", vaccinated: "N/A" } } }
        ];
        for (const pet of pets) {
            await insertProduct(pet, CATEGORY_MAP['Pets & Animals Accessories'], pet.attrs);
        }

        // Education - 4 courses
        console.log('\n📚 Inserting Education listings...');
        const education = [
            { title: "Mathematics & Science Tuition (Class 9-10)", fees: "3500", location: "New Delhi", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", description: "Experienced tutor with 10+ years", premium: true, attrs: { subject: "Maths & Science", specs: { mode: "Offline/Home", level: "High School", duration: "Monthly", language: "English" } } },
            { title: "IELTS & TOEFL Coaching - Guaranteed 7+ Band", fees: "12000", location: "New Delhi", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", description: "Comprehensive coaching with study material", premium: true, attrs: { subject: "English", specs: { mode: "Online/Offline", level: "Professional", duration: "3 Months", language: "English" } } },
            { title: "Personal Fitness Trainer Certification Course", fees: "45000", location: "New Delhi", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&q=80", description: "Become a certified trainer with job placement", premium: false, attrs: { subject: "Fitness", specs: { mode: "Offline", level: "Adult", duration: "6 Months", language: "English/Hindi" } } },
            { title: "French Language Classes for Beginners", fees: "8000", location: "New Delhi", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", description: "A1 level certification course", premium: false, attrs: { subject: "French", specs: { mode: "Online", level: "Beginner", duration: "3 Months", language: "French" } } }
        ];
        for (const edu of education) {
            await insertProduct(edu, CATEGORY_MAP['Learning & Education'], edu.attrs);
        }

        // Events - 4 events
        console.log('\n🎉 Inserting Events...');
        const events = [
            { title: "Arijit Singh Live Concert - India Tour", price: "1500", location: "New Delhi", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80", description: "15 OCT - 6:00 PM at JLN Stadium", premium: true, attrs: { date: "15 OCT", time: "6:00 PM Onwards", organizer: "Star Events" } },
            { title: "Delhi Food Carnival 2024", price: "0", location: "New Delhi", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", description: "20 OCT - 12:00 PM at Dilli Haat", premium: false, attrs: { date: "20 OCT", time: "12:00 PM - 10:00 PM", organizer: "Delhi Tourism" } },
            { title: "Standup Comedy Special - Zakir Khan", price: "999", location: "New Delhi", image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80", description: "22 OCT - 8:00 PM at Siri Fort", premium: true, attrs: { date: "22 OCT", time: "8:00 PM", organizer: "Comedy High" } },
            { title: "Startup Founders Meetup", price: "0", location: "Gurugram", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80", description: "25 OCT - 5:00 PM at WeWork Cyber City", premium: false, attrs: { date: "25 OCT", time: "5:00 PM - 8:00 PM", organizer: "Tech Circle" } }
        ];
        for (const event of events) {
            await insertProduct(event, CATEGORY_MAP['Local Events'], event.attrs);
        }

        // Services - 4 services
        console.log('\n🔧 Inserting Services...');
        const services = [
            { title: "Expert Home Plumbing Services", price: "500", location: "New Delhi", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80", description: "QuickFix Solutions - Visit charge", premium: true, attrs: { subcategory: "Plumbing", rating: 4.8, reviews: 124, provider: "QuickFix Solutions" } },
            { title: "Professional House Deep Cleaning", price: "1999", location: "New Delhi", image: "https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?w=800&q=80", description: "Sparkle Homes - 2BHK package", premium: true, attrs: { subcategory: "Deep Clean", rating: 4.9, reviews: 210, provider: "Sparkle Homes" } },
            { title: "AC Repair & Service - Brand Authorized", price: "600", location: "New Delhi", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80", description: "Cool Breeze Services - Visit charge", premium: false, attrs: { subcategory: "AC Repair", rating: 4.5, reviews: 89, provider: "Cool Breeze Services" } },
            { title: "Interior Design Consultation", price: "0", location: "New Delhi", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", description: "Urban Space Designs - Free consultation", premium: true, attrs: { subcategory: "Interior", rating: 5.0, reviews: 45, provider: "Urban Space Designs" } }
        ];
        for (const service of services) {
            await insertProduct(service, CATEGORY_MAP['Services'], service.attrs);
        }

        console.log(`\n✅ Successfully inserted ${insertedCount} products!`);

        // Verify
        const [products] = await connection.execute(
            'SELECT p.id, p.title, c.name as category, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id'
        );

        console.log('\n📋 Products in database:');
        console.table(products);

        const [imageCount] = await connection.execute('SELECT COUNT(*) as count FROM product_images');
        console.log(`\n🖼️  Total images downloaded: ${imageCount[0].count}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n✓ Database connection closed');
        }
    }
}

// Run the script
seedProducts();
