import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import UpcomingEvents from '@/components/UpcomingEvents';
import CommunityGallery from '@/components/CommunityGallery';
import ApplyToPerform from '@/components/ApplyToPerform';
import ConfessionsSection from '@/components/ConfessionsSection';
import AboutPreview from '@/components/AboutPreview';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutPreview />
        <BentoGrid />
        <UpcomingEvents />
        <CommunityGallery />
        <ConfessionsSection />
        <ApplyToPerform />
      </main>
    </>
  );
}
