export function FAQ() {
  const faqs = [
    { q: 'Do I need an account?', a: 'No. P2Gather is designed for zero-friction listening. Rooms are temporary and your data is never stored.' },
    { q: 'Why can’t I hear anything?', a: 'Browsers often block autoplay. If you join a room that is already playing, look for the "Tap to Sync" overlay.' },
    { q: 'What happens if my screen locks?', a: 'On some mobile browsers, playback may pause. We request a Screen Wake Lock to help keep the session active.' },
    { q: 'Which music works?', a: 'Any public video from YouTube and millions of tracks from Audius. No unofficial streams or extractors are used.' },
  ];

  return (
    <div className="py-24 px-6 max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-text-primary mb-32 text-center">FAQ</h2>
      <div className="space-y-32">
        {faqs.map((faq, i) => (
          <div key={i} className="space-y-8">
            <h4 className="text-text-primary font-semibold">{faq.q}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
