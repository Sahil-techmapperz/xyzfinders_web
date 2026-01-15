export default function GoogleAdBanner() {
    return (
        <section className="container mx-auto px-4 mb-12">
            <div className="flex justify-center">
                {/* Google Ad Placeholder */}
                <div className="w-full h-auto bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm relative group">
                    <img
                        src="https://placehold.co/1200x200/004c87/FFFFFF?text=Managed+WordPress+Hosting+-+Ad+Banner+Placeholder"
                        alt="Google Ad Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-white/80 text-[10px] text-gray-500 px-1">Ad</div>
                    <a href="#" className="absolute inset-0 z-10"></a>
                </div>
            </div>
        </section>
    );
}
