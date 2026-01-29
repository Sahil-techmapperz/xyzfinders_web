import Sell_Product_Banner from "@/public/sell_banner.png";
import Image from "next/image";
export default function SellProductBanner() {
    return (
        <section className="container mx-auto px-4 mb-12">
            <div className="rounded-xl overflow-hidden h-64 relative group">
                <Image
                    src={Sell_Product_Banner}
                    alt="Sell Your Product at Affordable Price"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <a href="#" className="absolute inset-0 z-10"></a>
            </div>
        </section>
    );
}
