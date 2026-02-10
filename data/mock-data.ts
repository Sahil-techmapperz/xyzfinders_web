
// Real Estate Data
export const MOCK_PROPERTIES = [
    {
        id: 1,
        title: "Premium 4BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 4, kitchen: 1, bathroom: 2 },
        tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Premium 2BHK Apartment for Rent",
        category: "House",
        type: "House",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 2, kitchen: 1, bathroom: 1 },
        tags: ["Room with Partition", "Fullfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "High-End Executive Female Bed Space |",
        category: "Girls PG",
        type: "Girls PG",
        price: "₹ 5,500",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { sharing: "4 Bed Sharing" },
        tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 4,
        title: "Premium 3BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 9,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 3, kitchen: 1, bathroom: 2 },
        tags: ["Spacious Plot", "Semi-furnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=60",
        verified: true,
        premium: true
    },
    {
        id: 5,
        title: "Premium 5BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 5, kitchen: 2, bathroom: 3 },
        tags: ["Spacious Plot", "Fully-furnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        verified: true,
        premium: true
    }
];

// Automobile Data
export const MOCK_AUTOMOBILES = [
    {
        id: 1,
        title: "Volvo XC90 T6 Inscription Highline",
        category: "Car",
        make: "Volvo",
        model: "XC90",
        variant: "T6 Inscription Highline",
        desc: "FORD ESCAPE 2014 PANORAMIC SUNROOF VERY...",
        year: 2016,
        km: "164,546 Km",
        fuel: "Petrol",
        price: "11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        premium: true,
        product_attributes: {
            horsepower: "316 HP",
            doors: "5 Doors",
            interior_color: "Black",
            exterior_color: "White",
            body_type: "SUV",
            seater_capacity: "7 Seater",
            engine_capacity: "1969 cc",
            warranty: "6 Months",
            mileage: "10-12 kmpl",
            assurance: ["Non-Accidental", "Service History"]
        }
    },
    {
        id: 2,
        title: "Audi Q3 35 TFSI",
        category: "Car",
        make: "Audi",
        model: "Q3",
        variant: "35 TFSI",
        desc: "AUDI Q3 2018 MODEL IN MINT CONDITION...",
        year: 2018,
        km: "45,000 Km",
        fuel: "Diesel",
        price: "255,546",
        location: "Sector 18, Noida, Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1974&auto=format&fit=crop",
        verified: true,
        premium: true,
        product_attributes: {
            horsepower: "148 HP",
            doors: "5 Doors",
            interior_color: "Beige",
            exterior_color: "Blue",
            body_type: "SUV",
            seater_capacity: "5 Seater",
            engine_capacity: "1968 cc",
            warranty: "1 Year",
            mileage: "15 kmpl",
            assurance: ["Certified Pre-Owned", "Non-Accidental"]
        }
    },
    {
        id: 3,
        title: "BMW 5 Series 520d Luxury Line",
        category: "Car",
        make: "BMW",
        model: "5 Series",
        variant: "520d Luxury Line",
        desc: "BMW 5 SERIES 2020 WITH SERVICE RECORDS...",
        year: 2020,
        km: "32,000 Km",
        fuel: "Diesel",
        price: "4,500,000",
        location: "Vasant Vihar, New Delhi",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/11/VN/FC/TN/64991677/bmw-5-series-520d-luxury-line.jpeg",
        verified: true,
        premium: false,
        product_attributes: {
            horsepower: "190 HP",
            doors: "4 Doors",
            interior_color: "Tan",
            exterior_color: "Black",
            body_type: "Sedan",
            seater_capacity: "5 Seater",
            engine_capacity: "1995 cc",
            warranty: "Company Warranty",
            mileage: "18 kmpl",
            assurance: ["Single Owner", "Insured"]
        }
    },
    {
        id: 4,
        title: "Mercedes-Benz C-Class C 220d",
        category: "Car",
        make: "Mercedes-Benz",
        model: "C-Class",
        variant: "C 220d Progressive",
        desc: "MERCEDES C CLASS IN EXCELLENT CONDITION...",
        year: 2019,
        km: "28,500 Km",
        fuel: "Diesel",
        price: "3,850,000",
        location: "Gurugram Phase 1, Haryana",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        verified: false,
        premium: true,
        product_attributes: {
            horsepower: "194 HP",
            doors: "4 Doors",
            interior_color: "Black",
            exterior_color: "Silver",
            body_type: "Sedan",
            seater_capacity: "5 Seater",
            engine_capacity: "1950 cc",
            warranty: "Expired",
            mileage: "16 kmpl",
            assurance: ["Dealer Warranty"]
        }
    },
    {
        id: 5,
        title: "Toyota Fortuner 2.8 4x4 AT",
        category: "SUV",
        make: "Toyota",
        model: "Fortuner",
        variant: "2.8 4x4 AT",
        desc: "TOYOTA FORTUNER TOP MODEL WHITE...",
        year: 2021,
        km: "55,000 Km",
        fuel: "Diesel",
        price: "3,200,000",
        location: "Connaught Place, New Delhi",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        premium: false,
        product_attributes: {
            horsepower: "201 HP",
            doors: "5 Doors",
            interior_color: "Chamois",
            exterior_color: "White",
            body_type: "SUV",
            seater_capacity: "7 Seater",
            engine_capacity: "2755 cc",
            warranty: "Extended Warranty",
            mileage: "10 kmpl",
            assurance: ["Toyota Certified"]
        }
    }
];

// Mobile Data
export const MOCK_MOBILES = [
    {
        id: 1,
        title: "iPhone 15 Pro Max 256 GB Storage Desert Titanium",
        category: "iOS",
        brand: "APPLE",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
        description: "EXCELLENT CONDITION 256GB STORAGE WITH ALL ACCESSORIES...",
        specs: {
            age: "6 MONTHS",
            model: "iPhone 15 Pro Max",
            storage: "256 GB",
            colour: "Desert Titanium"
        },
        price: "₹ 95,000/-",
        location: "Connaught Place, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra 12GB RAM, 512GB Storage",
        category: "Android",
        brand: "SAMSUNG",
        image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=2070&auto=format&fit=crop",
        description: "FLAGSHIP SMARTPHONE WITH AI FEATURES AND S-PEN INCLUDED...",
        specs: {
            age: "3 MONTHS",
            model: "Galaxy S24 Ultra",
            storage: "512 GB",
            colour: "Titanium Black"
        },
        price: "₹ 89,000/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "OnePlus 12 Pro 16GB RAM 256GB Storage",
        category: "Android",
        brand: "ONEPLUS",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
        description: "HASSELBLAD CAMERA SYSTEM WITH FAST CHARGING SUPPORT...",
        specs: {
            age: "1 YEAR",
            model: "OnePlus 12 Pro",
            storage: "256 GB",
            colour: "Midnight Black"
        },
        price: "₹ 52,000/-",
        location: "Rohini, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "Google Pixel 8 Pro 12GB RAM 256GB Storage",
        category: "Android",
        brand: "GOOGLE",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop",
        description: "PURE ANDROID EXPERIENCE WITH GOOGLE TENSOR G3 CHIP...",
        specs: {
            age: "BRAND NEW",
            model: "Pixel 8 Pro",
            storage: "256 GB",
            colour: "Obsidian"
        },
        price: "₹ 74,000/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 day ago",
        verified: false,
        premium: false
    }
];

// Pets Data
export const MOCK_PETS = [
    {
        id: 1,
        title: "Golden Retriever Puppies KCI Registered",
        category: "Dogs",
        type: "Dog",
        image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=2069&auto=format&fit=crop",
        description: "Adorbale Golden Retriever puppies available. KCI registered, first vaccination done. Very playful and healthy...",
        specs: {
            age: "45 Days",
            breed: "Golden Retriever",
            gender: "Male/Female",
            vaccinated: "Yes"
        },
        price: "₹ 25,000/-",
        location: "Vasant Vihar, New Delhi",
        postedTime: "Posted 3 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Persian Cat Kittens (Doll Face)",
        category: "Cats",
        type: "Cat",
        image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop",
        description: "Pure white Persian kittens with blue eyes. Litter trained and very friendly. Looking for a loving home.",
        specs: {
            age: "2 Months",
            breed: "Persian",
            gender: "Male",
            vaccinated: "No"
        },
        price: "₹ 12,000/-",
        location: "Lajpat Nagar, New Delhi",
        postedTime: "Posted 6 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Large Dog Cage / Crate (Heavy Duty)",
        category: "Accessories",
        type: "Accessory",
        image: "https://images.unsplash.com/photo-1598585226456-ccde20937a0c?q=80&w=2072&auto=format&fit=crop",
        description: "Heavy duty customized dog cage suitable for large breeds like German Shepherd, Rottweiler. Size 4x3x3 feet.",
        specs: {
            age: "New",
            breed: "Universal",
            gender: "N/A",
            vaccinated: "N/A"
        },
        price: "₹ 4,500/-",
        location: "Dwarka, New Delhi",
        postedTime: "Posted 10 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 4,
        title: "Pedigree Adult Dog Food Chicken & Vegetables 20kg",
        category: "Food",
        type: "Food",
        image: "https://images.unsplash.com/photo-1585846888147-3fe14c130048?q=80&w=1887&auto=format&fit=crop",
        description: "Unopened bag of Pedigree Adult Dog Food. Selling because my dog switched to a different diet. Market price 3800, selling for cheap.",
        specs: {
            age: "New",
            breed: "All Breeds",
            gender: "N/A",
            vaccinated: "N/A"
        },
        price: "₹ 2,800/-",
        location: "Rohini, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    }
];

// Education Data
export const MOCK_EDUCATION = [
    {
        id: 1,
        title: "Mathematics & Science Tuition (Class 9-10)",
        category: "Tuition",
        subject: "Maths & Science",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
        description: "Experienced tutor with 10+ years of experience. Focus on concept building and exam preparation. Weekly tests and doubt sessions.",
        specs: {
            mode: "Offline/Home",
            level: "High School",
            duration: "Monthly",
            language: "English"
        },
        fees: "₹ 3,500/-",
        location: "Dwarka Sector 12, New Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "IELTS & TOEFL Coaching - Guaranteed 7+ Band",
        category: "Exam Prep",
        subject: "English",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        description: "Comprehensive coaching for IELTS/TOEFL. Study material included. Mock tests every weekend. Flexible timings.",
        specs: {
            mode: "Online/Offline",
            level: "Professional",
            duration: "3 Months",
            language: "English"
        },
        fees: "₹ 12,000/-",
        location: "Rajouri Garden, New Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Personal Fitness Trainer Certification Course",
        category: "Vocational",
        subject: "Fitness",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
        description: "Become a certified fitness trainer. Practical training included. Job placement assistance provided after course completion.",
        specs: {
            mode: "Offline",
            level: "Adult",
            duration: "6 Months",
            language: "English/Hindi"
        },
        fees: "₹ 45,000/-",
        location: "Saket, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: false,
        premium: false
    },
    {
        id: 4,
        title: "French Language Classes for Beginners",
        category: "Language",
        subject: "French",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
        description: "Learn French from a level A1 certified trainer. Small batch size for personal attention. Weekend classes available.",
        specs: {
            mode: "Online",
            level: "Beginner",
            duration: "3 Months",
            language: "French"
        },
        fees: "₹ 8,000/-",
        location: "Vasant Kunj, New Delhi",
        postedTime: "Posted 3 days ago",
        verified: true,
        premium: false
    }
];

// Events Data
export const MOCK_EVENTS = [
    {
        id: 1,
        title: "Arijit Singh Live Concert - India Tour",
        category: "Music",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
        date: "15 OCT",
        time: "6:00 PM Onwards",
        location: "JLN Stadium, New Delhi",
        price: "₹ 1,500 onwards",
        organizer: "Star Events",
        description: "Experience the magic of Arijit Singh live in concert. A night full of soulful melodies and chart-topping hits. Book your tickets now!",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Delhi Food Carnival 2024",
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
        date: "20 OCT",
        time: "12:00 PM - 10:00 PM",
        location: "Dilli Haat, INA",
        price: "Entry Free",
        organizer: "Delhi Tourism",
        description: "A celebration of flavors! Taste dishes from over 50 renowned food stalls. Live music, games, and fun for the whole family.",
        verified: true,
        premium: false
    },
    {
        id: 3,
        title: "Standup Comedy Special - Zakir Khan",
        category: "Comedy",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
        date: "22 OCT",
        time: "8:00 PM",
        location: "Siri Fort Auditorium",
        price: "₹ 999 onwards",
        organizer: "Comedy High",
        description: "Laugh your heart out with the 'Sakht Launda' himself. Brand new material, never performed before specials.",
        verified: true,
        premium: true
    },
    {
        id: 4,
        title: "Startup Founders Meetup",
        category: "Networking",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
        date: "25 OCT",
        time: "5:00 PM - 8:00 PM",
        location: "WeWork, Cyber City",
        price: "Free (Reg. Req.)",
        organizer: "Tech Circle",
        description: "Connect with fellow founders, investors, and tech enthusiasts. Panel discussions on scaling and fundraising.",
        verified: false,
        premium: false
    }
];

// Services Data
export const MOCK_SERVICES = [
    {
        id: 1,
        title: "Expert Home Plumbing Services",
        category: "Home Maintenance",
        subcategory: "Plumbing",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop",
        rating: 4.8,
        reviews: 124,
        location: "Kalkaji, New Delhi",
        price: "₹ 500 Visit Charge",
        verified: true,
        premium: true,
        provider: "QuickFix Solutions"
    },
    {
        id: 2,
        title: "Professional House Deep Cleaning",
        category: "Cleaning",
        subcategory: "Deep Clean",
        image: "https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?q=80&w=1974&auto=format&fit=crop",
        rating: 4.9,
        reviews: 210,
        location: "Vasant Kunj, New Delhi",
        price: "₹ 1,999 (2BHK)",
        verified: true,
        premium: true,
        provider: "Sparkle Homes"
    },
    {
        id: 3,
        title: "AC Repair & Service - Brand Authorized",
        category: "Appliances",
        subcategory: "AC Repair",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
        rating: 4.5,
        reviews: 89,
        location: "Dwarka, New Delhi",
        price: "₹ 600 Visit Charge",
        verified: false,
        premium: false,
        provider: "Cool Breeze Services"
    },
    {
        id: 4,
        title: "Interior Design Consultation",
        category: "Design",
        subcategory: "Interior",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        rating: 5.0,
        reviews: 45,
        location: "South Ex, New Delhi",
        price: "Free Consultation",
        verified: true,
        premium: true,
        provider: "Urban Space Designs"
    }
];

// Beauty Data
export const MOCK_BEAUTY = [
    {
        id: 1,
        title: "Premium Bridal Makeup & Hair Styling Package",
        category: "Bridal Makeup",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop",
        description: "Complete bridal transformation with professional makeup artist. Includes pre-bridal consultation, trial makeup session, and final bridal makeup with hairstyling on the wedding day.",
        specs: {
            serviceFor: "Female",
            type: "Home Service",
            duration: "3-4 Hours",
            rating: "4.8/5"
        },
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
        specs: {
            serviceFor: "All",
            type: "Salon",
            duration: "90 Minutes",
            rating: "4.6/5"
        },
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
        specs: {
            serviceFor: "Male",
            type: "Salon",
            duration: "1 Hour",
            rating: "4.5/5"
        },
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
        specs: {
            serviceFor: "All",
            type: "Salon",
            duration: "45 Minutes",
            rating: "4.7/5"
        },
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
        specs: {
            serviceFor: "Female",
            type: "Home Service",
            duration: "2 Hours",
            rating: "4.9/5"
        },
        price: "₹ 3,500/-",
        location: "Greater Kailash, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: true
    }
];

// Electronics Data
export const MOCK_ELECTRONICS = [
    {
        id: 1,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        category: "Headphones",
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
        description: "Industry-leading noise cancellation with premium sound quality. Perfect condition with original box and all accessories.",
        specs: {
            condition: "Like New",
            warranty: "In Warranty",
            age: "6 Months",
            color: "Black"
        },
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
        specs: {
            condition: "Good",
            warranty: "Expired",
            age: "1 Year",
            color: "Silver"
        },
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
        specs: {
            condition: "Excellent",
            warranty: "3 Months Left",
            age: "8 Months",
            color: "Black"
        },
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
        specs: {
            condition: "Like New",
            warranty: "No",
            age: "10 Months",
            color: "White"
        },
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
        specs: {
            condition: "Brand New",
            warranty: "1 Year",
            age: "New",
            color: "Titanium"
        },
        price: "₹ 78,000/-",
        location: "Vasant Vihar, New Delhi",
        postedTime: "Posted 6 hr ago",
        verified: true,
        premium: true
    }
];

// Furniture Data
export const MOCK_FURNITURE = [
    {
        id: 1,
        title: "Modern L-Shaped Sofa Set - 6 Seater with Premium Fabric",
        category: "Sofa",
        material: "Fabric & Wood",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
        description: "Beautiful L-shaped sofa in excellent condition. Made with high-quality fabric and solid wooden frame. Perfect for modern living rooms.",
        specs: {
            condition: "Like New",
            dimensions: "240x180 cm",
            age: "6 Months",
            color: "Grey"
        },
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
        specs: {
            condition: "Good",
            dimensions: "King Size (78x72)",
            age: "2 Years",
            color: "Walnut"
        },
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
        specs: {
            condition: "Good",
            dimensions: "180x90 cm",
            age: "3 Years",
            color: "Natural Wood"
        },
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
        specs: {
            condition: "Like New",
            dimensions: "Standard",
            age: "4 Months",
            color: "Black"
        },
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
        specs: {
            condition: "Brand New",
            dimensions: "120x60 cm",
            age: "New",
            color: "Oak"
        },
        price: "₹ 8,500/-",
        location: "Rohini, New Delhi",
        postedTime: "Posted 12 hr ago",
        verified: true,
        premium: false
    }
];

// Jobs Data
export const MOCK_JOBS = [
    {
        id: 1,
        title: "Sales Coordinator / Operation Executive",
        company: "DTC Group",
        category: "Sales",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        description: "Looking for dynamic sales coordinator to handle client relations and operations. Real estate experience preferred.",
        specs: {
            type: "Full-time",
            experience: "1-2 Years",
            salary: "₹17,000 - ₹23,000/month",
            qualification: "Bachelor's Degree"
        },
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
        specs: {
            type: "Full-time",
            experience: "2-4 Years",
            salary: "₹8,00,000 - ₹12,00,000/year",
            qualification: "B.Tech/MCA"
        },
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
        specs: {
            type: "Full-time",
            experience: "3-5 Years",
            salary: "₹6,00,000 - ₹9,00,000/year",
            qualification: "MBA Marketing"
        },
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
        specs: {
            type: "Full-time",
            experience: "1-3 Years",
            salary: "₹3,50,000 - ₹5,00,000/year",
            qualification: "MBA HR"
        },
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
        specs: {
            type: "Full-time/Remote",
            experience: "0-2 Years",
            salary: "₹2,50,000 - ₹4,00,000/year",
            qualification: "Graduate"
        },
        location: "Remote / Delhi NCR",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: false,
        applicants: 120
    }
];


// Fashion Data
export const MOCK_FASHION = [
    {
        id: 1,
        title: "Zara Man Slim Fit Blazer - Navy Blue",
        category: "Men",
        subcategory: "Clothing",
        brand: "Zara",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=1974&auto=format&fit=crop"
        ],
        description: "Classic navy blue blazer from Zara. Slim fit, perfect for formal occasions or office wear. Worn only twice.",
        specs: {
            size: "40 (L)",
            condition: "Like New",
            material: "Wool Blend",
            color: "Navy Blue"
        },
        price: "₹ 2,500/-",
        location: "Vasant Kunj, New Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true,
        seller_name: "Rahul Verma",
        seller_id: 101
    },
    {
        id: 2,
        title: "H&M Floral Summer Dress",
        category: "Women",
        subcategory: "Clothing",
        brand: "H&M",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop"
        ],
        description: "Beautiful floral summer dress. Lightweight and comfortable. Perfect for casual outings.",
        specs: {
            size: "M",
            condition: "New with Tags",
            material: "Cotton",
            color: "Multi"
        },
        price: "₹ 1,200/-",
        location: "Saket, New Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: false,
        seller_name: "Priya Singh",
        seller_id: 102
    },
    {
        id: 3,
        title: "Nike Air Jordan 1 High - Chicago Lost & Found",
        category: "Men",
        subcategory: "Footwear",
        brand: "Nike",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop"
        ],
        description: "Authentic Air Jordan 1s. Limited edition. Box and bill available.",
        specs: {
            size: "UK 9",
            condition: "Brand New",
            material: "Leather",
            color: "Red/White/Black"
        },
        price: "₹ 35,000/-",
        location: "Connaught Place, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: true,
        seller_name: "SneakerHead Delhi",
        seller_id: 103
    },
    {
        id: 4,
        title: "Louis Vuitton Neverfull MM Tote Bag",
        category: "Women",
        subcategory: "Accessories",
        brand: "Louis Vuitton",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop"
        ],
        description: "Original LV Tote bag. Gently used. Comes with dust bag and authenticity card.",
        specs: {
            size: "Medium",
            condition: "Good",
            material: "Canvas",
            color: "Brown Monogram"
        },
        price: "₹ 85,000/-",
        location: "Greater Kailash, New Delhi",
        postedTime: "Posted 3 days ago",
        verified: true,
        premium: true,
        seller_name: "Luxury Resale",
        seller_id: 104
    },
    {
        id: 5,
        title: "Ray-Ban Aviator Sunglasses",
        category: "Unisex",
        subcategory: "Accessories",
        brand: "Ray-Ban",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop"
        ],
        description: "Classic gold frame aviators. Scratch-free lenses. Original case included.",
        specs: {
            size: "Standard",
            condition: "Excellent",
            material: "Metal",
            color: "Gold/Green"
        },
        price: "₹ 4,500/-",
        location: "Dwarka, New Delhi",
        postedTime: "Posted 6 hr ago",
        verified: false,
        premium: false
    }
];

// Unified List
export const ALL_LISTINGS = [
    ...MOCK_PROPERTIES.map(item => ({ ...item, listingType: 'property' })),
    ...MOCK_AUTOMOBILES.map(item => ({ ...item, listingType: 'automobile' })),
    ...MOCK_MOBILES.map(item => ({ ...item, listingType: 'mobile' })),
    ...MOCK_PETS.map(item => ({ ...item, listingType: 'pet' })),
    ...MOCK_EDUCATION.map(item => ({ ...item, listingType: 'education' })),
    ...MOCK_EVENTS.map(item => ({ ...item, listingType: 'event' })),
    ...MOCK_SERVICES.map(item => ({ ...item, listingType: 'service' })),
    ...MOCK_BEAUTY.map(item => ({ ...item, listingType: 'beauty' })),
    ...MOCK_ELECTRONICS.map(item => ({ ...item, listingType: 'electronics' })),
    ...MOCK_FURNITURE.map(item => ({ ...item, listingType: 'furniture' })),
    ...MOCK_FASHION.map(item => ({ ...item, listingType: 'fashion' })),
    ...MOCK_JOBS.map(item => ({ ...item, listingType: 'job' })),
];

