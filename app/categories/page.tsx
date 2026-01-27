'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ALL_LISTINGS } from '@/data/mock-data';
import GlobalFilterSidebar from '@/components/shared/GlobalFilterSidebar';
import PropertyCard from '@/components/real-estate/PropertyCard';
import AutomobileCard from '@/components/automobiles/AutomobileCard';
import MobileCard from '@/components/mobiles/MobileCard';

function GlobalListingsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize State from URL Params
    const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
        const categories = searchParams.getAll('category');
        return categories.length > 0 ? categories : ['All'];
    });
    const [priceRange, setPriceRange] = useState<[number, number]>(() => {
        const min = searchParams.get('minPrice');
        const max = searchParams.get('maxPrice');
        return [min ? parseInt(min) : 0, max ? parseInt(max) : 100000000];
    });
    const [verifiedOnly, setVerifiedOnly] = useState(() => searchParams.get('verified') === 'true');
    const [premiumOnly, setPremiumOnly] = useState(() => searchParams.get('premium') === 'true');
    const [locationFilter, setLocationFilter] = useState(() => searchParams.get('location') || '');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sort') || 'recommended');
    const [currentPage, setCurrentPage] = useState(() => {
        const page = searchParams.get('page');
        return page ? parseInt(page) : 1;
    });

    const itemsPerPage = 9;

    // Sync State to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);

        if (!selectedCategory.includes('All')) {
            selectedCategory.forEach(c => params.append('category', c));
        } else {
            // If All is implicitly selected, we typically don't set it, or set it to 'All'. 
            // Previous logic set 'category' if !== 'All'.
            // Let's set it to 'All' if explicitly tracking it, or omit.
            // But my state init does: searchParams.getAll('category'). || 'All'.
            // If URL is empty, state is ['All']. So clearing params relies on absence -> All.
            params.set('category', 'All');
        }

        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < 100000000) params.set('maxPrice', priceRange[1].toString());
        if (verifiedOnly) params.set('verified', 'true');
        if (premiumOnly) params.set('premium', 'true');
        if (locationFilter) params.set('location', locationFilter);
        if (sortBy !== 'recommended') params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', currentPage.toString());

        router.replace(`${pathname}?${params.toString()}`);
    }, [searchQuery, selectedCategory, priceRange, verifiedOnly, premiumOnly, locationFilter, sortBy, currentPage, pathname, router]);

    // Reset pagination when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, priceRange, verifiedOnly, premiumOnly, locationFilter, sortBy]);

    // Filter Logic
    const filteredListings = useMemo(() => {
        let result = ALL_LISTINGS.filter(item => {
            // Search
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase());

            // Category mapping
            let matchesCategory = true;
            if (!selectedCategory.includes('All')) {
                matchesCategory = selectedCategory.some(cat => {
                    if (cat === 'Real Estate') return item.listingType === 'property';
                    if (cat === 'Automobiles') return item.listingType === 'automobile';
                    if (cat === 'Mobiles') return item.listingType === 'mobile';
                    return false;
                });
            }

            // Price 
            const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
            const matchesPrice = priceNum >= priceRange[0] && priceNum <= priceRange[1];

            // Badges
            const matchesVerified = verifiedOnly ? item.verified : true;
            const matchesPremium = premiumOnly ? item.premium : true;

            // Location Filter
            const matchesLocation = locationFilter ? item.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;

            return matchesSearch && matchesCategory && matchesPrice && matchesVerified && matchesPremium && matchesLocation;
        });

        // Sorting Logic
        if (sortBy === 'price-low') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''));
                return priceB - priceA;
            });
        } else if (sortBy === 'newest') {
            // Mock data uses ID as proxy for newness if date not available
            result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [searchQuery, selectedCategory, priceRange, verifiedOnly, premiumOnly, locationFilter, sortBy]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
    const paginatedListings = filteredListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-gray-50 min-h-screen py-8 font-jost">
            <div className="container mx-auto px-4">

                {/* Top Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center mb-8 sticky top-0 z-40">
                    <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange/20 transition-all">
                        <i className="ri-search-line text-gray-400 text-xl mr-3"></i>
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="bg-brand-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-[#e07a46] transition shadow-md hidden md:block">
                        Search
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <GlobalFilterSidebar
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            verifiedOnly={verifiedOnly}
                            setVerifiedOnly={setVerifiedOnly}
                            premiumOnly={premiumOnly}
                            setPremiumOnly={setPremiumOnly}
                            locationFilter={locationFilter}
                            setLocationFilter={setLocationFilter}
                        />
                    </aside>

                    {/* Main Content Grid */}
                    <main className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedCategory.includes('All') ? 'All Listings' : `${selectedCategory.join(', ')} Listings`}
                                <span className="text-gray-400 text-sm font-normal ml-2">({filteredListings.length} found)</span>
                            </h2>
                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer hover:border-brand-orange transition-colors"
                            >
                                <option value="recommended">Sort by: Recommended</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>

                        {paginatedListings.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6">
                                    {paginatedListings.map((item: any) => {
                                        if (item.listingType === 'property') return <PropertyCard key={`${item.listingType}-${item.id}`} property={item} />;
                                        if (item.listingType === 'automobile') return <AutomobileCard key={`${item.listingType}-${item.id}`} auto={item} />;
                                        if (item.listingType === 'mobile') return <MobileCard key={`${item.listingType}-${item.id}`} item={item} />;
                                        return null;
                                    })}
                                </div>

                                {/* Pagination Controls */}
                                <div className="mt-8 flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <i className="ri-arrow-left-s-line text-lg"></i>
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-lg border flex items-center justify-center font-medium transition-colors ${currentPage === page
                                                ? 'bg-brand-orange border-brand-orange text-white'
                                                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <i className="ri-arrow-right-s-line text-lg"></i>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <i className="ri-file-search-line text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No results found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory(['All']);
                                        setVerifiedOnly(false);
                                        setPremiumOnly(false);
                                        setLocationFilter('');
                                        setSortBy('recommended');
                                    }}
                                    className="mt-4 text-brand-orange font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>

                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div></div>}>
            <GlobalListingsContent />
        </Suspense>
    );
}
