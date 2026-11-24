import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { SpecGrid } from '../components/SpecGrid';
import { LiveRoomPreview } from '../components/LiveRoomPreview';
import { HowItWorks } from '../components/HowItWorks';
import { ACloserLook } from '../components/ACloserLook';
import { JoinWithCode } from '../components/JoinWithCode';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="relative min-h-screen text-text-primary">
      <NavBar />
      <main className="pt-16">
        <Hero />
        <SpecGrid />
        <LiveRoomPreview />
        <HowItWorks />
        <ACloserLook />
        <JoinWithCode />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
