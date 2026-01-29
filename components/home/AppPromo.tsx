import Mobile_app_banner from "@/public/Mobile_app_banner.png"
import Image from "next/image";

export default function AppPromo() {
    return (
        <section className="container mx-auto px-4 mb-12">
            <div className="rounded-3xl overflow-hidden">
                <a href="#">
                    <Image src={Mobile_app_banner} alt="NexCart App Available" className="w-full h-auto object-cover" />
                </a>
            </div>
        </section>
    );
}
