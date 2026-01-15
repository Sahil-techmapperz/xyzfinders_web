export default function MobileBanner() {
    return (
        <section className="container mx-auto px-4 mb-12">
            <div className="rounded-xl overflow-hidden h-64 relative group">
                <img
                    src="https://placehold.co/1200x300/FFF5E6/005251?text=Mobile+%26+Tablet+Promo+Banner"
                    alt="Looking for Sale or Buy your Mobile & Tablet?"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <a href="#" className="absolute inset-0 z-10"></a>
            </div>
        </section>
    );
}
