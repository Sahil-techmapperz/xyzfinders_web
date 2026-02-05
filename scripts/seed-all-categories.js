/**
 * COMPREHENSIVE CATEGORY SEEDING SCRIPT
 * 
 * This script will:
 * 1. DELETE all existing products for BEAUTY, ELECTRONICS, FURNITURE, JOBS categories
 * 2. INSERT fresh data from the embedded mock data below
 * 
 * Run: node scripts/seed-all-categories.js
 */

const mysql = require('mysql2/promise');
const https = require('https');

// ============================================================================
// MOCK DATA - Extracted from data/mock-data.ts
// ============================================================================

const MOCK_BEAUTY = [
    {
        id: 1,
        title: "Premium Bridal Makeup & Hair Styling Package",
        category: "Bridal Makeup",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop",
        description: "Complete bridal transformation with professional makeup artist. Includes pre-bridal consultation, trial makeup session, and final bridal makeup with hairstyling on the wedding day.",
        specs: { serviceFor: "Female", type: "Home Service", duration: "3-4 Hours", rating: "4.8/5" },
        price: "₹ 15,000/-",
        location: "South Delhi, New Delhi, Delhi",
        postedTime: "Posted 30 min ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Full Body Massage & Spa Treatment",
        category: "Spa & Massage",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        description: "Relaxing full body massage with aromatherapy oils. Includes steam bath and body scrub. Perfect for stress relief and muscle relaxation.",
        specs: { serviceFor: "All", type: "Salon", duration: "90 Minutes", rating: "4.6/5" },
        price: "₹ 2,500/-",
        location: "Hauz Khas, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Men's Grooming Package",
        category: "Men's Grooming",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
        description: "Complete grooming package for men including haircut, beard styling, facial, and head massage. Walk-in welcome.",
        specs: { serviceFor: "Male", type: "Salon", duration: "1 Hour", rating: "4.5/5" },
        price: "₹ 800/-",
        location: "CP, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "Hair Spa Treatment",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
        description: "Deep conditioning hair spa with protein treatment and scalp massage. Suitable for all hair types.",
        specs: { serviceFor: "All", type: "Salon", duration: "45 Minutes", rating: "4.7/5" },
        price: "₹ 1,200/-",
        location: "Dwarka, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 5,
        title: "Party Makeup",
        category: "Party Makeup",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
        description: "Glamorous party makeup with long-lasting products. Hair styling included. Touch-up kit provided.",
        specs: { serviceFor: "Female", type: "Home Service", duration: "2 Hours", rating: "4.9/5" },
        price: "₹ 3,500/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    }
];

const MOCK_ELECTRONICS = [
    {
        id: 1,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        category: "Headphones",
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
        description: "Industry-leading noise cancellation with premium sound quality. Perfect condition with original box and all accessories.",
        specs: { condition: "Like New", warranty: "In Warranty", age: "6 Months", color: "Black" },
        price: "₹ 18,500/-",
        location: "Connaught Place, New Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Dell XPS 15 Laptop - Core i7, 16GB RAM, 512GB SSD",
        category: "Laptop",
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=2069&auto=format&fit=crop",
        description: "High-performance laptop for professionals. 4K OLED display, excellent for graphics and video editing.",
        specs: { condition: "Good", warranty: "Expired", age: "1 Year", color: "Silver" },
        price: "₹ 85,000/-",
        location: "Gurgaon, Haryana",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Canon EOS R6 Mark II Mirrorless Camera",
        category: "Camera",
        brand: "Canon",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2038&auto=format&fit=crop",
        description: "Professional mirrorless camera with 24.2MP sensor. Includes 24-70mm lens and extra battery.",
        specs: { condition: "Excellent", warranty: "3 Months Left", age: "8 Months", color: "Black" },
        price: "₹ 1,75,000/-",
        location: "Noida, Uttar Pradesh",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "PlayStation 5 with 2 Controllers",
        category: "Gaming",
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
        description: "Disc edition PS5 with original box, 2 DualSense controllers, and 3 games included.",
        specs: { condition: "Like New", warranty: "No", age: "10 Months", color: "White" },
        price: "₹ 42,000/-",
        location: "Saket, New Delhi",
        postedTime: "Posted 3 hr ago",
        verified: false,
        premium: true
    },
    {
        id: 5,
        title: "Apple Watch Ultra 2 - GPS + Cellular",
        category: "Smartwatch",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2071&auto=format&fit=crop",
        description: "Latest Apple Watch Ultra 2 with titanium case. Includes 3 bands. Perfect for fitness and diving.",
        specs: { condition: "Brand New", warranty: "1 Year", age: "New", color: "Titanium" },
        price: "₹ 78,000/-",
        location: "Vasant Vihar, New Delhi",
        postedTime: "Posted 6 hr ago",
        verified: true,
        premium: true
    }
];

const MOCK_FURNITURE = [
    {
        id: 1,
        title: "Modern L-Shaped Sofa Set - 6 Seater with Premium Fabric",
        category: "Sofa",
        material: "Fabric & Wood",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
        description: "Beautiful L-shaped sofa in excellent condition. Made with high-quality fabric and solid wooden frame. Perfect for modern living rooms.",
        specs: { condition: "Like New", dimensions: "240x180 cm", age: "6 Months", color: "Grey" },
        price: "₹ 45,000/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 1 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "King Size Bed with Storage & Mattress",
        category: "Bedroom",
        material: "Engineered Wood",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
        description: "King size hydraulic storage bed with premium mattress. Side tables included. Very well maintained.",
        specs: { condition: "Good", dimensions: "King Size (78x72)", age: "2 Years", color: "Walnut" },
        price: "₹ 28,000/-",
        location: "Dwarka, New Delhi",
        postedTime: "Posted 3 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "6 Seater Dining Table Set - Solid Sheesham Wood",
        category: "Dining",
        material: "Sheesham Wood",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop",
        description: "Genuine sheesham wood dining table with 6 chairs. Classic design, very sturdy. Minor scratches due to regular use.",
        specs: { condition: "Good", dimensions: "180x90 cm", age: "3 Years", color: "Natural Wood" },
        price: "₹ 35,000/-",
        location: "Noida Sector 62, UP",
        postedTime: "Posted 6 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 4,
        title: "Ergonomic Office Chair - Premium Mesh",
        category: "Office",
        material: "Metal & Mesh",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop",
        description: "High-back ergonomic office chair with lumbar support, adjustable armrests, and headrest. Perfect for work from home.",
        specs: { condition: "Like New", dimensions: "Standard", age: "4 Months", color: "Black" },
        price: "₹ 12,000/-",
        location: "Gurgaon, Haryana",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: false
    },
    {
        id: 5,
        title: "Study Table with Bookshelf - Compact Design",
        category: "Study",
        material: "Engineered Wood",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2136&auto=format&fit=crop",
        description: "Space-saving study table with attached bookshelf and drawer. Perfect for students. Easy to assemble.",
        specs: { condition: "Brand New", dimensions: "120x60 cm", age: "New", color: "Oak" },
        price: "₹ 8,500/-",
        location: "Rohini, New Delhi",
        postedTime: "Posted 12 hr ago",
        verified: true,
        premium: false
    }
];

const MOCK_JOBS = [
    {
        id: 1,
        title: "Sales Coordinator / Operation Executive",
        company: "DTC Group",
        category: "Sales",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        description: "Looking for dynamic sales coordinator to handle client relations and operations. Real estate experience preferred.",
        specs: { type: "Full-time", experience: "1-2 Years", salary: "₹17,000 - ₹23,000/month", qualification: "Bachelor's Degree" },
        location: "Sector 49, Gurugram, Haryana",
        postedTime: "Posted 14 hr ago",
        verified: true,
        premium: true,
        applicants: 156
    },
    {
        id: 2,
        title: "Full Stack Developer - React & Node.js",
        company: "TechVision Solutions",
        category: "IT",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        description: "Join our growing team as a Full Stack Developer. Work on cutting-edge projects with modern tech stack.",
        specs: { type: "Full-time", experience: "2-4 Years", salary: "₹8,00,000 - ₹12,00,000/year", qualification: "B.Tech/MCA" },
        location: "Noida Sector 62, UP",
        postedTime: "Posted 2 days ago",
        verified: true,
        premium: true,
        applicants: 89
    },
    {
        id: 3,
        title: "Digital Marketing Manager",
        company: "Brand Starter Agency",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        description: "Lead our digital marketing efforts including SEO, SEM, social media, and content marketing.",
        specs: { type: "Full-time", experience: "3-5 Years", salary: "₹6,00,000 - ₹9,00,000/year", qualification: "MBA Marketing" },
        location: "Hauz Khas, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false,
        applicants: 67
    },
    {
        id: 4,
        title: "HR Executive - Recruitment Specialist",
        company: "ManpowerHub",
        category: "HR",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
        description: "Handle end-to-end recruitment for IT and non-IT roles. Experience with job portals required.",
        specs: { type: "Full-time", experience: "1-3 Years", salary: "₹3,50,000 - ₹5,00,000/year", qualification: "MBA HR" },
        location: "Saket, New Delhi",
        postedTime: "Posted 3 days ago",
        verified: false,
        premium: false,
        applicants: 45
    },
    {
        id: 5,
        title: "Content Writer - English",
        company: "WriteRight Media",
        category: "Content",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop",
        description: "Create engaging content for blogs, websites, and social media. SEO knowledge is a plus.",
        specs: { type: "Full-time/Remote", experience: "0-2 Years", salary: "₹2,50,000 - ₹4,00,000/year", qualification: "Graduate" },
        location: "Remote / Delhi NCR",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: false,
        applicants: 120
    }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), 30000);
        https.get(url, (response) => {
            clearTimeout(timeout);
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}`));
                return;
            }
            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;

    let str = String(priceStr);

    // Handle ranges - take the first value
    if (str.includes('-')) {
        str = str.split('-')[0].trim();
    }

    // Remove currency symbols and slashes
    const cleaned = str.replace(/₹|\/|\s/g, '').replace(/,/g, '');

    // Handle yearly salaries - divide by 12 for monthly
    if (priceStr.includes('year')) {
        const num = parseFloat(cleaned);
        return Math.floor(num / 12);
    }

    // Handle monthly salaries or regular prices
    return parseFloat(cleaned) || 0;
}

// ============================================================================
// MAIN SEEDING LOGIC
// ============================================================================

async function seedAllCategories() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    const stats = { deleted: 0, inserted: 0, errors: 0 };

    try {
        console.log('\n✅ Connected to database!\n');

        const [users] = await connection.query('SELECT id FROM users LIMIT 1');
        const userId = users[0]?.id || 1;

        const [locations] = await connection.query('SELECT id FROM locations LIMIT 1');
        const locationId = locations[0]?.id || 1;

        const categories = [
            { name: 'BEAUTY', slug: 'beauty', data: MOCK_BEAUTY },
            { name: 'ELECTRONICS', slug: 'electronics', data: MOCK_ELECTRONICS },
            { name: 'FURNITURE', slug: 'furniture', data: MOCK_FURNITURE },
            { name: 'JOBS', slug: 'jobs', data: MOCK_JOBS }
        ];

        for (const cat of categories) {
            console.log(`\n${'='.repeat(70)}`);
            console.log(`  ${cat.name} CATEGORY`);
            console.log(`${'='.repeat(70)}\n`);

            const [catRows] = await connection.query(
                'SELECT id FROM categories WHERE slug = ?', [cat.slug]
            );

            if (catRows.length === 0) {
                console.log(`⚠️  Category '${cat.name}' not found, skipping...\n`);
                continue;
            }

            const categoryId = catRows[0].id;

            // DELETE existing products
            console.log(`🗑️  Deleting existing ${cat.name} products...`);
            const [delResult] = await connection.query(
                'DELETE FROM products WHERE category_id = ?', [categoryId]
            );
            stats.deleted += delResult.affectedRows;
            console.log(`   ✓ Deleted ${delResult.affectedRows} products\n`);

            if (!cat.data || cat.data.length === 0) {
                console.log(`⚠️  No mock data available for ${cat.name}\n`);
                continue;
            }

            // INSERT new products
            console.log(`📦 Inserting ${cat.data.length} ${cat.name} products...\n`);

            for (let i = 0; i < cat.data.length; i++) {
                const item = cat.data[i];

                try {
                    console.log(`  [${i + 1}/${cat.data.length}] ${item.title.substring(0, 50)}...`);

                    // Extract price/salary based on item structure
                    let priceValue = item.price || item.fees || item.salary || item.specs?.salary || '0';
                    const price = parsePrice(priceValue);

                    const attrs = { ...item };
                    delete attrs.id; delete attrs.title; delete attrs.description;
                    delete attrs.price; delete attrs.fees; delete attrs.salary;

                    const [result] = await connection.query(
                        `INSERT INTO products (user_id, category_id, location_id, title, description, 
                         product_attributes, price, \`condition\`, product_condition, status, is_featured, created_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 'new', 'active', ?, NOW())`,
                        [userId, categoryId, locationId, item.title, item.description || '',
                            JSON.stringify(attrs), price, item.premium ? 1 : 0]
                    );

                    const productId = result.insertId;

                    if (item.image) {
                        try {
                            const imgBuff = await downloadImage(item.image);
                            await connection.query(
                                'INSERT INTO product_images (product_id, image_data, display_order, is_primary) VALUES (?, ?, 1, 1)',
                                [productId, imgBuff]
                            );
                            console.log(`     ✓ ID:${productId} + Image (${(imgBuff.length / 1024).toFixed(0)}KB)`);
                        } catch (e) {
                            console.log(`     ✓ ID:${productId} (image failed: ${e.message})`);
                        }
                    } else {
                        console.log(`     ✓ ID:${productId}`);
                    }

                    stats.inserted++;
                } catch (err) {
                    console.error(`     ✗ Error: ${err.message}`);
                    stats.errors++;
                }
            }
        }

        console.log(`\n${'='.repeat(70)}`);
        console.log(`  SUMMARY`);
        console.log(`${'='.repeat(70)}`);
        console.log(`  Deleted:  ${stats.deleted} products`);
        console.log(`  Inserted: ${stats.inserted} products`);
        console.log(`  Errors:   ${stats.errors}`);
        console.log(`${'='.repeat(70)}\n`);

    } catch (error) {
        console.error('\n❌ Fatal Error:', error.message);
        console.error(error.stack);
    } finally {
        await connection.end();
        console.log('✅ Database connection closed.\n');
    }
}

seedAllCategories();
