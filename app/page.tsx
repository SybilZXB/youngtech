import LoadingScreen from "@/components/ui/LoadingScreen";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import MarqueeSection from "@/sections/MarqueeSection";
import MissionExperienceSection from "@/sections/MissionExperienceSection";
import BrandStorySection from "@/sections/BrandStorySection";
import GlobalPeaksSection from "@/sections/GlobalPeaksSection";
import ProductsSection from "@/sections/ProductsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <MissionExperienceSection />
        <BrandStorySection />
        <GlobalPeaksSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
