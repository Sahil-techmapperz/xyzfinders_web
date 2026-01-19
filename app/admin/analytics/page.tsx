'use client';

export default function AdminAnalytics() {
    const metrics = [
        { label: 'Total Revenue', value: '₹3.2L', change: '+15%', trend: 'up' },
        { label: 'New Users (30d)', value: '342', change: '+12%', trend: 'up' },
        { label: 'Active Listings', value: '1,234', change: '+8%', trend: 'up' },
        { label: 'Avg. Response Time', value: '2.4h', change: '-10%', trend: 'down' },
    ];

    const topCategories = [
        { name: 'Real Estate', count: 2345, percentage: 35 },
        { name: 'Automobiles', count: 1876, percentage: 28 },
        { name: 'Electronics', count: 1234, percentage: 18 },
        { name: 'Mobiles', count: 987, percentage: 14 },
        { name: 'Others', count: 345, percentage: 5 },
    ];

    const topSellers = [
        { name: 'Tech Store Premium', products: 145, revenue: '₹45,000', rating: 4.8 },
        { name: 'Property Dealers Inc', products: 98, revenue: '₹38,000', rating: 4.9 },
        { name: 'Auto World', products: 87, revenue: '₹32,000', rating: 4.7 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-500">Platform insights and metrics</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">{metric.label}</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-gray-900">{metric.value}</h3>
                                <span className={`text-sm font-semibold flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    <i className={`${metric.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}`}></i>
                                    {metric.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Categories */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Categories</h2>
                        <div className="space-y-4">
                            {topCategories.map((category, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                        <span className="text-sm text-gray-500">{category.count} listings</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                                            style={{ width: `${category.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Sellers */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Sellers</h2>
                        <div className="space-y-4">
                            {topSellers.map((seller, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{seller.name}</p>
                                            <p className="text-xs text-gray-500">{seller.products} products</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{seller.revenue}</p>
                                        <div className="flex items-center gap-1 text-xs text-yellow-600">
                                            <i className="ri-star-fill"></i>
                                            {seller.rating}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
