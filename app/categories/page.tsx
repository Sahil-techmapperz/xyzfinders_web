'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import GlobalFilterSidebar from '@/components/shared/GlobalFilterSidebar';
import PropertyCard from '@/components/real-estate/PropertyCard';
import AutomobileCard from '@/components/automobiles/AutomobileCard';
import MobileCard from '@/components/mobiles/MobileCard';
import PetsCard from '@/components/pets/PetsCard';
import EducationCard from '@/components/education/EducationCard';
import EventsCard from '@/components/events/EventsCard';
import ServicesCard from '@/components/services/ServicesCard';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category_id: number;
    category_name: string;
    location_id: number;
    city: string;
    seller_name: string;
    images: Array<{
        id: number;
        image: string;
        is_primary: boolean;
    }>;
    condition?: string;
    created_at: string;
    is_featured?: number;
    product_attributes?: any;
}

function GlobalListingsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Fetch initial params
    const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
    const initialLocation = searchParams.get('location') || '';
    const initialCategories = searchParams.getAll('category');

    // State
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState<string[]>(
        initialCategories.length > 0 ? initialCategories : ['All']
    );
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [premiumOnly, setPremiumOnly] = useState(false);
    const [locationFilter, setLocationFilter] = useState(initialLocation);
    const [sortBy, setSortBy] = useState('recommended');
    const [currentPage, setCurrentPage] = useState(1);

    // API State
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [categories, setCategories] = useState<any[]>([]);

    const itemsPerPage = 20;

    // Fetch categories on mount
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCategories(data.data);
                }
            })
            .catch(err => console.error('Failed to fetch categories:', err));
    }, []);

    // Fetch products whenever filters change
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.set('page', currentPage.toString());
                params.set('per_page', itemsPerPage.toString());

                if (searchQuery) params.set('search', searchQuery);
                if (locationFilter) params.set('search', `${searchQuery} ${locationFilter}`.trim());

                // Map category names to IDs
                if (!selectedCategory.includes('All') && categories.length > 0) {
                    selectedCategory.forEach(catName => {
                        const cat = categories.find(c => c.name === catName);
                        if (cat) {
                            params.set('category_id', cat.id.toString());
                        }
                    });
                }

                if (priceRange[0] > 0) params.set('min_price', priceRange[0].toString());
                if (priceRange[1] < 100000000) params.set('max_price', priceRange[1].toString());

                const response = await fetch(`/api/products?${params.toString()}`);
                const data = await response.json();

                if (data.success) {
                    setProducts(data.data || []);
                    setTotalProducts(data.pagination?.total || 0);
                } else {
                    setProducts([]);
                    setTotalProducts(0);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery, selectedCategory, priceRange, locationFilter, currentPage, categories]);

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (!selectedCategory.includes('All')) {
            selectedCategory.forEach(c => params.append('category', c));
        }
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < 100000000) params.set('maxPrice', priceRange[1].toString());
        if (locationFilter) params.set('location', locationFilter);
        if (sortBy !== 'recommended') params.set('sort', sortBy);
        if (currentPage > 1) params.set('page', currentPage.toString());

        router.replace(`${pathname}?${params.toString()}`);
    }, [searchQuery, selectedCategory, priceRange, locationFilter, sortBy, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, priceRange, locationFilter, sortBy]);

    // Client-side sorting (since API doesn't support all sort options)
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0;
    });

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // Map products to listing card format
    const mapProductToCard = (product: Product) => {
        const imageUrl = product.images?.[0]?.image
            ? `data:image/jpeg;base64,${product.images[0].image}`
            : '/placeholder.jpg';

        const categoryType = getCategoryType(product.category_name);

        // Parse product_attributes if it's a string (from JSON column)
        let attrs = null;
        if (product.product_attributes) {
            try {
                attrs = typeof product.product_attributes === 'string'
                    ? JSON.parse(product.product_attributes)
                    : product.product_attributes;
            } catch (e) {
                console.warn('Failed to parse product_attributes:', e);
            }
        }

        // Base card data
        const baseCard = {
            id: product.id,
            title: product.title,
            price: `₹${product.price.toLocaleString()}`,
            location: product.city || 'Unknown',
            image: imageUrl,
            verified: false,
            premium: product.is_featured === 1,
            listingType: categoryType,
        };

        // Add category-specific properties from product_attributes
        if (categoryType === 'property') {
            return {
                ...baseCard,
                category: 'Real Estate',
                type: attrs?.type || '',
                tags: attrs?.tags || [],
                specs: {
                    bedroom: attrs?.specs?.bedroom || '',
                    kitchen: attrs?.specs?.kitchen || '',
                    bathroom: attrs?.specs?.bathroom || '',
                    sharing: attrs?.specs?.sharing || ''
                },
                description: product.description || ''
            };
        }

        if (categoryType === 'automobile') {
            return {
                ...baseCard,
                category: 'Automobiles',
                make: attrs?.make || '',
                model: attrs?.model || '',
                variant: attrs?.variant || '',
                year: attrs?.year || '',
                kms: attrs?.kms || '',
                fuel: attrs?.fuel || '',
                transmission: attrs?.transmission || ''
            };
        }

        if (categoryType === 'mobile') {
            return {
                ...baseCard,
                category: 'Mobile & Tablet',
                brand: attrs?.brand || '',
                specs: {
                    age: attrs?.specs?.age || 'Used',
                    model: attrs?.specs?.model || product.title.split(' ').slice(0, 2).join(' ') || 'Unknown Model',
                    storage: attrs?.specs?.storage || '64GB',
                    colour: attrs?.specs?.colour || 'Black'
                },
                postedTime: 'Recently',
                description: product.description || ''
            };
        }

        if (categoryType === 'pet') {
            return {
                ...baseCard,
                category: 'Pets & Animals',
                type: attrs?.type || '',
                specs: {
                    age: attrs?.specs?.age || 'N/A',
                    breed: attrs?.specs?.breed || 'Mixed',
                    gender: attrs?.specs?.gender || 'N/A',
                    vaccinated: attrs?.specs?.vaccinated || 'No'
                },
                postedTime: 'Recently',
                description: product.description || ''
            };
        }

        if (categoryType === 'education') {
            return {
                ...baseCard,
                category: 'Learning & Education',
                subject: attrs?.subject || '',
                specs: {
                    mode: attrs?.specs?.mode || 'Online/Offline',
                    level: attrs?.specs?.level || 'All Levels',
                    duration: attrs?.specs?.duration || 'Flexible',
                    language: attrs?.specs?.language || 'English'
                },
                fees: `₹${product.price.toLocaleString()}`,
                postedTime: 'Recently',
                description: product.description || ''
            };
        }

        if (categoryType === 'event') {
            return {
                ...baseCard,
                category: 'Local Events',
                date: attrs?.date || '',
                time: attrs?.time || '',
                organizer: attrs?.organizer || '',
                description: product.description || ''
            };
        }

        if (categoryType === 'service') {
            return {
                ...baseCard,
                category: 'Services',
                subcategory: attrs?.subcategory || '',
                rating: attrs?.rating || 0,
                reviews: attrs?.reviews || 0,
                provider: attrs?.provider || '',
                description: product.description || ''
            };
        }

        // For other types, just return base card with description
        return {
            ...baseCard,
            category: product.category_name || 'Other',
            description: product.description || ''
        } as any;
    };

    const getCategoryType = (categoryName: string): string => {
        const mapping: Record<string, string> = {
            'Real Estate': 'property',
            'Automobiles': 'automobile',
            'Mobile & Tablet': 'mobile',
            'Mobiles': 'mobile',
            'Pets & Animals Accessories': 'pet',
            'Learning & Education': 'education',
            'Local Events': 'event',
            'Services': 'service'
        };
        return mapping[categoryName] || 'property';
    };

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
                    <button
                        onClick={() => setSearchQuery(searchQuery)}
                        className="bg-brand-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-[#e07a46] transition shadow-md hidden md:block"
                    >
                        Search
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0">
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
                                <span className="text-gray-400 text-sm font-normal ml-2">({totalProducts} found)</span>
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

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
                            </div>
                        ) : sortedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6">
                                    {sortedProducts.map((product) => {
                                        const item = mapProductToCard(product);
                                        if (item.listingType === 'property') return <PropertyCard key={product.id} property={item} />;
                                        if (item.listingType === 'automobile') return <AutomobileCard key={product.id} auto={item} />;
                                        if (item.listingType === 'mobile') return <MobileCard key={product.id} item={item} />;
                                        if (item.listingType === 'pet') return <PetsCard key={product.id} item={item} />;
                                        if (item.listingType === 'education') return <EducationCard key={product.id} item={item} />;
                                        if (item.listingType === 'event') return <EventsCard key={product.id} item={item} />;
                                        if (item.listingType === 'service') return <ServicesCard key={product.id} item={item} />;
                                        return null;
                                    })}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <i className="ri-arrow-left-s-line text-lg"></i>
                                        </button>

                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let page;
                                            if (totalPages <= 5) {
                                                page = i + 1;
                                            } else if (currentPage <= 3) {
                                                page = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                page = totalPages - 4 + i;
                                            } else {
                                                page = currentPage - 2 + i;
                                            }
                                            return (
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
                                            );
                                        })}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <i className="ri-arrow-right-s-line text-lg"></i>
                                        </button>
                                    </div>
                                )}
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
