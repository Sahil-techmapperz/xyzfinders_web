import Link from 'next/link';
import Image from 'next/image';
import Mobile_Banner from "@/public/mobile_banner.png";

export default function MobileBanner() {
    return (
        <section className="hidden md:block container mx-auto px-4 mb-12">
            <div className="rounded-xl overflow-hidden h-64 relative group">
                <Image
                    src={Mobile_Banner}
                    alt="Looking for Sale or Buy your Mobile & Tablet?"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <Link href="/mobiles" className="absolute inset-0 z-10"></Link>
            </div>
        </section>
    );
}
