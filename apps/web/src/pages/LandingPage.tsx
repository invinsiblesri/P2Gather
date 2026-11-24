import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ACloserLook } from '../components/ACloserLook';
import { HowItWorks } from '../components/HowItWorks';
import { JoinWithCode } from '../components/JoinWithCode';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="relative min-h-screen text-bone-50">
      <NavBar />
      <main className="pt-14">
        <Hero />
        <ACloserLook />
        <Features />
        <HowItWorks />
        <JoinWithCode />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
