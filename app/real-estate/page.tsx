import RealEstateHero from '@/components/real-estate/RealEstateHero';
import PropertyListings from '@/components/real-estate/PropertyListings';

export const metadata = {
    title: 'Real Estate - Properties for Sale & Rent | XYZ Finders',
    description: 'Find your dream property - apartments, houses, and commercial spaces for sale or rent',
};

export default function RealEstatePage() {
    return (
        <>
            <RealEstateHero />
            <PropertyListings />
        </>
    );
}
