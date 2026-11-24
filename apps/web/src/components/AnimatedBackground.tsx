export function AnimatedBackground() {
  return (
    <>
      {/* Gradient mesh */}
      <div className="mesh-bg" aria-hidden="true" />
      {/* Grid field */}
      <div className="grid-field fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
      {/* Noise overlay */}
      <div className="noise-veil" aria-hidden="true" />
    </>
  );
}
