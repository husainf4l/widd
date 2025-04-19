import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AIAnalysisSection from "@/components/AIAnalysisSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import ImmersiveSportsSection from "@/components/ImmersiveSportsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ImmersiveSportsSection />
      <AIAnalysisSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}
