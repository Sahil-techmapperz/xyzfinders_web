
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
        premium: true
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
        premium: true
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
        premium: false
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
        premium: true
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
        premium: false
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

// Unified List
export const ALL_LISTINGS = [
    ...MOCK_PROPERTIES.map(item => ({ ...item, listingType: 'property' })),
    ...MOCK_AUTOMOBILES.map(item => ({ ...item, listingType: 'automobile' })),
    ...MOCK_MOBILES.map(item => ({ ...item, listingType: 'mobile' })),
    ...MOCK_PETS.map(item => ({ ...item, listingType: 'pet' })),
    ...MOCK_EDUCATION.map(item => ({ ...item, listingType: 'education' })),
    ...MOCK_EVENTS.map(item => ({ ...item, listingType: 'event' })),
    ...MOCK_SERVICES.map(item => ({ ...item, listingType: 'service' })),
];
