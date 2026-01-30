export const NAV_ITEMS = [
    {
        label: "Real Estate",
        link: "/real-estate",
        badge: "NEW",
        dropdown: {
            cols: [
                {
                    title: "For Rent",
                    items: [
                        { label: "Residential", link: "/real-estate?type=residential&for=rent" },
                        { label: "Commercial", link: "/real-estate?type=commercial&for=rent" },
                        { label: "Rooms For Rent", link: "/real-estate?type=room&for=rent" },
                        { label: "Monthly Short Term", link: "/real-estate?type=monthly&for=rent" },
                        { label: "Daily Short Term", link: "/real-estate?type=daily&for=rent" },
                    ]
                },
                {
                    title: "For Sale",
                    items: [
                        { label: "New Projects", link: "/real-estate?type=projects&for=sale" },
                        { label: "Residential", link: "/real-estate?type=residential&for=sale" },
                        { label: "Commercial", link: "/real-estate?type=commercial&for=sale" },
                        { label: "Off-Plan", link: "/real-estate?type=off-plan&for=sale" },
                        { label: "Land", link: "/real-estate?type=land&for=sale" },
                        { label: "Multiple Units", link: "/real-estate?type=units&for=sale" },
                    ]
                }
            ],
            footerLink: { label: "Agent & Agency Search", link: "/agents", badge: "NEW" }
        }
    },
    {
        label: "Mobile & Tablet",
        link: "/mobiles",
        dropdown: {
            cols: [
                {
                    title: "Mobiles",
                    items: [
                        { label: "Apple iPhones", link: "/mobiles?brand=apple" },
                        { label: "Samsung", link: "/mobiles?brand=samsung" },
                        { label: "OnePlus", link: "/mobiles?brand=oneplus" },
                        { label: "Google Pixel", link: "/mobiles?brand=google" },
                    ]
                },
                {
                    title: "Accessories",
                    items: [
                        { label: "Tablets", link: "/mobiles?type=tablet" },
                        { label: "Wearables", link: "/mobiles?type=wearable" },
                        { label: "Accessories", link: "/mobiles?type=accessory" },
                    ]
                }
            ]
        }
    },
    {
        label: "Automobiles",
        link: "/automobiles",
        dropdown: {
            cols: [
                {
                    title: "Cars",
                    items: [
                        { label: "Used Cars", link: "/automobiles?condition=used" },
                        { label: "New Cars", link: "/automobiles?condition=new" },
                        { label: "Electric Vehicles", link: "/automobiles?fuel=electric" },
                    ]
                },
                {
                    title: "Bikes & Others",
                    items: [
                        { label: "Motorcycles", link: "/automobiles?type=motorcycle" },
                        { label: "Scooters", link: "/automobiles?type=scooter" },
                        { label: "Heavy Vehicles", link: "/automobiles?type=heavy" },
                    ]
                }
            ]
        }
    },
    {
        label: "Services",
        link: "/services",
    },
    {
        label: "Learning & Education",
        link: "/education",
    },
    {
        label: "Gadgets & Electronics",
        link: "/gadgets",
    },
    {
        label: "Pets & Animals Accessories",
        link: "/pets",
    },
    {
        label: "Beauty & Well being",
        link: "/beauty",
    },
    {
        label: "Furniture & Appliance",
        link: "/furniture",
        badge: "NEW",
        dropdown: {
            cols: [
                {
                    title: "Home Furniture",
                    items: [
                        { label: "Sofa & Dining", link: "/furniture?cat=sofa" },
                        { label: "Beds & Wardrobes", link: "/furniture?cat=bed" },
                        { label: "Home Decor", link: "/furniture?cat=decor" },
                    ]
                },
                {
                    title: "Appliances",
                    items: [
                        { label: "TV & Audio", link: "/gadgets?cat=tv" },
                        { label: "Kitchen Appliances", link: "/furniture?cat=kitchen" },
                        { label: "ACs & Coolers", link: "/furniture?cat=ac" },
                    ]
                }
            ]
        }
    },
    {
        label: "Local Events",
        link: "/events",
    },
    {
        label: "Job's",
        link: "/jobs",
    }
];

export const BROWSE_CATEGORIES = [
    { name: "Real Estate", icon: "/categories/properties.png", link: "/real-estate", isImage: true },
    { name: "Mobile & Tablet", icon: "/categories/mobiles.png", link: "/electronics/mobiles", isImage: true },
    { name: "Automobiles", icon: "/categories/cars.png", link: "/automobiles", isImage: true },
    { name: "Services", icon: "/categories/services.png", link: "/services", isImage: true },
    { name: "Learning & Education", icon: "/categories/education.png", link: "/education", isImage: true },
    { name: "Gadgets & Electronics", icon: "/categories/gadgets.png", link: "/electronics", isImage: true },
    { name: "Pets & Animals Accessories", icon: "/categories/pets.png", link: "/pets", isImage: true },
    { name: "Fashions", icon: "/categories/fashion.png", link: "/fashion", isImage: true },
    { name: "Beauty & Well being", icon: "/categories/beauty.png", link: "/beauty", isImage: true },
    { name: "Furniture & Appliance", icon: "/categories/furniture.png", link: "/furniture", isImage: true },
    { name: "Local Events", icon: "/categories/events.png", link: "/events", isImage: true },
    { name: "Job's", icon: "/categories/jobs.png", link: "/jobs", isImage: true },
];
