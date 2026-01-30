import PromoGrid from '@/components/home/PromoGrid';
import CategoryGrid from '@/components/home/CategoryGrid';
import GoogleAdBanner from '@/components/home/GoogleAdBanner';
import WeeklyDeals from '@/components/home/WeeklyDeals';
import MobileBanner from '@/components/home/MobileBanner';
import ResidentialRent from '@/components/home/ResidentialRent';
import SellProductBanner from '@/components/home/SellProductBanner';
import Automobiles from '@/components/home/Automobiles';
import ApartmentSearch from '@/components/home/ApartmentSearch';
import Gadgets from '@/components/home/Gadgets';
import BeautyWellbeing from '@/components/home/BeautyWellbeing';
import AppPromo from '@/components/home/AppPromo';

export default function Home() {
  return (
    <>
      <GoogleAdBanner />
      <PromoGrid />
      <CategoryGrid />
      <GoogleAdBanner />
      <WeeklyDeals />
      <MobileBanner />
      <ResidentialRent />
      <SellProductBanner />
      <Automobiles />
      <ApartmentSearch />
      <Gadgets />
      <GoogleAdBanner />
      <BeautyWellbeing />
      <AppPromo />
    </>
  );
}

