import { useState } from 'react';
import { Logo } from '../ui/Logo';
import { Section } from '../components/Section';
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
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <NavBar />
      <Hero />
      <SpecGrid />
      <LiveRoomPreview />
      <HowItWorks />
      <ACloserLook />
      <JoinWithCode />
      <FAQ />
      <Footer />
    </div>
  );
}