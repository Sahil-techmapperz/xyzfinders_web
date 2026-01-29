
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

// Unified List
export const ALL_LISTINGS = [
    ...MOCK_PROPERTIES.map(item => ({ ...item, listingType: 'property' })),
    ...MOCK_AUTOMOBILES.map(item => ({ ...item, listingType: 'automobile' })),
    ...MOCK_MOBILES.map(item => ({ ...item, listingType: 'mobile' })),
];
