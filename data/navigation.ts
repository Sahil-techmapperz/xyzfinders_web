export const NAV_ITEMS = [
    {
        label: "Property",
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
        label: "More",
        link: "/categories"
    }
];

export const BROWSE_CATEGORIES = [
    { name: "Real Estate", icon: "ri-building-line", link: "/real-estate" },
    { name: "Automobiles", icon: "ri-car-line", link: "/automobiles" },
    { name: "Mobiles", icon: "ri-smartphone-line", link: "/mobiles" },
    { name: "Furniture", icon: "ri-sofa-line", link: "/furniture" },
    { name: "Electronics", icon: "ri-macbook-line", link: "/gadgets" },
    { name: "Beauty", icon: "ri-sparkling-line", link: "/beauty" },
    { name: "Services", icon: "ri-service-line", link: "/seller/place-ad/services/create" },
    { name: "Education", icon: "ri-book-open-line", link: "/seller/place-ad/education/create" },
];
