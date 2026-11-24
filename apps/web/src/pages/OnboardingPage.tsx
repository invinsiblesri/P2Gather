import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Check, ChevronRight, Music } from 'lucide-react';

const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Bengali',
  'Marathi',
  'Spanish',
  'Korean',
  'Japanese',
  'Arabic',
  'French',
  'German',
];

interface ArtistOption {
  name: string;
  languages: string[];
  imageUrl: string;
}

const ARTISTS: ArtistOption[] = [
  { name: 'Arijit Singh', languages: ['Hindi', 'Bengali'], imageUrl: '' },
  { name: 'A.R. Rahman', languages: ['Hindi', 'Tamil', 'Telugu'], imageUrl: '' },
  { name: 'Shreya Ghoshal', languages: ['Hindi', 'Bengali', 'Tamil'], imageUrl: '' },
  { name: 'Pritam', languages: ['Hindi'], imageUrl: '' },
  { name: 'Vishal-Shekhar', languages: ['Hindi'], imageUrl: '' },
  { name: 'Anirudh Ravichander', languages: ['Tamil', 'Telugu', 'Hindi'], imageUrl: '' },
  { name: 'Sid Sriram', languages: ['Tamil', 'Telugu', 'English'], imageUrl: '' },
  { name: 'Yuvan Shankar Raja', languages: ['Tamil'], imageUrl: '' },
  { name: 'Thaman S', languages: ['Telugu', 'Tamil'], imageUrl: '' },
  { name: 'S.P. Balasubrahmanyam', languages: ['Telugu', 'Tamil', 'Kannada'], imageUrl: '' },
  { name: 'Devi Sri Prasad', languages: ['Telugu', 'Tamil'], imageUrl: '' },
  { name: 'Shankar Mahadevan', languages: ['Hindi', 'Marathi', 'Kannada'], imageUrl: '' },
  { name: 'Sonu Nigam', languages: ['Hindi', 'Kannada'], imageUrl: '' },
  { name: 'KK', languages: ['Hindi', 'Bengali', 'Tamil'], imageUrl: '' },
  { name: 'Diljit Dosanjh', languages: ['Punjabi', 'Hindi'], imageUrl: '' },
  { name: 'AP Dhillon', languages: ['Punjabi', 'English'], imageUrl: '' },
  { name: 'Drake', languages: ['English'], imageUrl: '' },
  { name: 'The Weeknd', languages: ['English'], imageUrl: '' },
  { name: 'Taylor Swift', languages: ['English'], imageUrl: '' },
  { name: 'Ed Sheeran', languages: ['English'], imageUrl: '' },
  { name: 'Billie Eilish', languages: ['English'], imageUrl: '' },
  { name: 'Bad Bunny', languages: ['Spanish'], imageUrl: '' },
  { name: 'Rosalía', languages: ['Spanish'], imageUrl: '' },
  { name: 'BTS', languages: ['Korean'], imageUrl: '' },
  { name: 'BLACKPINK', languages: ['Korean', 'English'], imageUrl: '' },
  { name: 'Stray Kids', languages: ['Korean'], imageUrl: '' },
  { name: 'YOASOBI', languages: ['Japanese'], imageUrl: '' },
  { name: 'Kenshi Yonezu', languages: ['Japanese'], imageUrl: '' },
  { name: 'Mohammed Abdo', languages: ['Arabic'], imageUrl: '' },
  { name: 'Stromae', languages: ['French'], imageUrl: '' },
  { name: 'Rammstein', languages: ['German'], imageUrl: '' },
  { name: 'KID CUDI', languages: ['English'], imageUrl: '' },
  { name: 'Lata Mangeshkar', languages: ['Hindi', 'Marathi', 'Bengali'], imageUrl: '' },
  { name: 'Ilaiyaraaja', languages: ['Tamil', 'Telugu', 'Malayalam', 'Kannada'], imageUrl: '' },
  { name: 'K.J. Yesudas', languages: ['Malayalam', 'Tamil', 'Kannada'], imageUrl: '' },
  { name: 'Mohanlal', languages: ['Malayalam'], imageUrl: '' },
];

function getArtistColor(name: string): string {
  const colors = [
    'from-electric/30 to-hot/10',
    'from-hot/30 to-electric/10',
    'from-electric/20 to-electric/5',
    'from-hot/20 to-hot/5',
    'from-electric/25 to-hot/15',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { setLanguages, setArtists, completeOnboarding, user } = useAuthStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtistsList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.rv');
    if (!els) return;
    const timer = setTimeout(() => {
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add('rv-in'), i * 40);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  const toggleLang = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const toggleArtist = (name: string) => {
    setSelectedArtistsList((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  };

  const handleNextStep = () => {
    setLanguages(selectedLangs);
    setStep(2);
  };

  const handleFinish = () => {
    setArtists(selectedArtists);
    completeOnboarding();
    navigate('/');
  };

  const filteredArtists = ARTISTS.filter((a) =>
    a.languages.some((l) => selectedLangs.includes(l)),
  );

  return (
    <div className="relative min-h-screen text-bone-50">
      <div className="mesh-bg" />
      <div className="noise-veil" />

      <div className="relative max-w-2xl mx-auto px-5 py-16 sm:py-24" ref={containerRef}>
        {/* Progress */}
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-display font-semibold transition-colors ${
                step >= 1 ? 'bg-electric text-white' : 'border border-edge text-bone-500'
              }`}
            >
              {step > 1 ? <Check size={14} /> : '1'}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400">
              Languages
            </span>
          </div>
          <div className="flex-1 h-px bg-edge" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-display font-semibold transition-colors ${
                step >= 2 ? 'bg-electric text-white' : 'border border-edge text-bone-500'
              }`}
            >
              2
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400">
              Artists
            </span>
          </div>
        </div>

        {/* Step 1 — Languages */}
        {step === 1 && (
          <div>
            <div className="rv mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                What languages do you listen in?
              </h2>
              <p className="mt-3 text-bone-400 text-sm">
                Pick at least one to personalize your experience.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LANGUAGES.map((lang) => {
                const active = selectedLangs.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLang(lang)}
                    className={`rv group relative flex items-center gap-3 border rounded-lg px-4 py-3.5 text-left transition-all ${
                      active
                        ? 'border-electric bg-electric/10 text-bone-50'
                        : 'border-edge bg-ink-900/60 text-bone-300 hover:border-edge-hi hover:text-bone-50'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        active
                          ? 'bg-electric border-electric'
                          : 'border-bone-500 group-hover:border-bone-300'
                      }`}
                    >
                      {active && <Check size={12} className="text-white" />}
                    </div>
                    <span className="font-display text-sm font-medium">{lang}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={selectedLangs.length === 0}
                className="btn-solid text-sm px-8 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Artists */}
        {step === 2 && (
          <div>
            <div className="rv mb-8">
              <button
                onClick={() => setStep(1)}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-500 hover:text-bone-300 transition-colors mb-4 block"
              >
                ← Back to languages
              </button>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                Pick your favorite artists
              </h2>
              <p className="mt-3 text-bone-400 text-sm">
                Select at least 3 artists you love. We&apos;ll use these to personalize your feed.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredArtists.map((artist) => {
                const active = selectedArtists.includes(artist.name);
                return (
                  <button
                    key={artist.name}
                    onClick={() => toggleArtist(artist.name)}
                    className={`rv group relative flex flex-col items-center border rounded-spot p-4 transition-all ${
                      active
                        ? 'border-electric bg-electric/10'
                        : 'border-edge bg-ink-900/60 hover:border-edge-hi'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`relative h-16 w-16 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${getArtistColor(artist.name)} border ${
                        active ? 'border-electric' : 'border-edge-hi'
                      }`}
                    >
                      <Music size={20} className="text-bone-300" />
                      {active && (
                        <div className="absolute inset-0 bg-electric/30 flex items-center justify-center">
                          <Check size={20} className="text-white" />
                        </div>
                      )}
                    </div>
                    <span className="mt-3 font-display text-sm font-medium text-bone-50 text-center leading-tight truncate w-full">
                      {artist.name}
                    </span>
                    <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-bone-500 truncate w-full text-center">
                      {artist.languages.join(' · ')}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-16 border border-edge rounded-spot bg-ink-900/40">
                <p className="text-bone-500 text-sm">
                  No artists found for your selected languages.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-electric hover:underline"
                >
                  Change languages
                </button>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-500">
                {selectedArtists.length} selected
                {selectedArtists.length < 3 && ' (min 3)'}
              </span>
              <button
                onClick={handleFinish}
                disabled={selectedArtists.length < 3}
                className="btn-solid text-sm px-8 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
