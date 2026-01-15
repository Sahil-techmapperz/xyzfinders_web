export default function SellProductBanner() {
    return (
        <section className="container mx-auto px-4 mb-12">
            <div className="rounded-xl overflow-hidden h-64 relative group">
                <img
                    src="https://placehold.co/1200x300/50C878/FFFFFF?text=Sell+Your+Product+at+Affordable+Price"
                    alt="Sell Your Product at Affordable Price"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <a href="#" className="absolute inset-0 z-10"></a>
            </div>
        </section>
    );
}
