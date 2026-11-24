import { useRef, useEffect, useCallback } from 'react';

interface BeatVisualizerProps {
  frequencyData: Uint8Array;
  artworkUrl?: string;
  size?: number;
  variant?: 'circle' | 'bars' | 'wave';
}

const ELECTRIC = '#0066FF';
const ELECTRIC_GLOW = 'rgba(0, 102, 255, 0.5)';

export function BeatVisualizer({
  frequencyData,
  artworkUrl,
  size = 280,
  variant = 'circle',
}: BeatVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgLoaded = useRef(false);
  const rafId = useRef<number | null>(null);
  const dataRef = useRef(frequencyData);

  // Keep data ref in sync
  dataRef.current = frequencyData;

  // Load artwork image
  useEffect(() => {
    if (!artworkUrl) {
      imgRef.current = null;
      imgLoaded.current = false;
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      imgLoaded.current = true;
    };
    img.onerror = () => {
      imgRef.current = null;
      imgLoaded.current = false;
    };
    img.src = artworkUrl;
  }, [artworkUrl]);

  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const data = dataRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;
      const barCount = 64;
      const maxBarLen = Math.min(w, h) * 0.15;

      // Calculate bass energy for pulse
      let bassEnergy = 0;
      for (let i = 0; i < 8; i++) bassEnergy += (data[i] || 0);
      bassEnergy /= 8 * 255;
      const pulse = 1 + bassEnergy * 0.03;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);

      // Draw artwork circle
      if (imgRef.current && imgLoaded.current) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        const img = imgRef.current;
        const drawSize = radius * 2;
        ctx.drawImage(img, -radius, -radius, drawSize, drawSize);
        ctx.restore();
      } else {
        // Fallback: dark circle with note
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1524';
        ctx.fill();
        ctx.fillStyle = '#B0BAD0';
        ctx.font = `${radius * 0.5}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♪', 0, 0);
        ctx.restore();
      }

      // Circle border
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(248, 250, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Radial frequency bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;
        const freqIdx = Math.floor((i / barCount) * (data.length * 0.75));
        const val = (data[freqIdx] || 0) / 255;
        const barLen = val * maxBarLen + 2;

        const x1 = Math.cos(angle) * (radius + 4);
        const y1 = Math.sin(angle) * (radius + 4);
        const x2 = Math.cos(angle) * (radius + 4 + barLen);
        const y2 = Math.sin(angle) * (radius + 4 + barLen);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = ELECTRIC;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';

        // Glow
        ctx.shadowColor = ELECTRIC_GLOW;
        ctx.shadowBlur = 6 + val * 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Bass glow ring
      if (bassEnergy > 0.3) {
        ctx.beginPath();
        ctx.arc(0, 0, radius + maxBarLen + 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 102, 255, ${bassEnergy * 0.2})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = ELECTRIC_GLOW;
        ctx.shadowBlur = bassEnergy * 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    },
    [],
  );

  const drawBars = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const data = dataRef.current;
      const barCount = 32;
      const gap = 2;
      const barW = (w - gap * (barCount - 1)) / barCount;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const freqIdx = Math.floor((i / barCount) * data.length * 0.75);
        const val = (data[freqIdx] || 0) / 255;
        const barH = Math.max(2, val * h * 0.9);
        const x = i * (barW + gap);
        const y = h - barH;

        ctx.fillStyle = ELECTRIC;
        ctx.shadowColor = ELECTRIC_GLOW;
        ctx.shadowBlur = val * 8;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 1);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    },
    [],
  );

  const drawWave = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const data = dataRef.current;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      const sliceW = w / data.length;

      for (let i = 0; i < data.length; i++) {
        const val = (data[i] || 128) / 255;
        const y = val * h;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(i * sliceW, y);
      }

      ctx.strokeStyle = ELECTRIC;
      ctx.lineWidth = 2;
      ctx.shadowColor = ELECTRIC_GLOW;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
    },
    [],
  );

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      switch (variant) {
        case 'circle':
          drawCircle(ctx, size, size);
          break;
        case 'bars':
          drawBars(ctx, size, size);
          break;
        case 'wave':
          drawWave(ctx, size, size);
          break;
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [size, variant, drawCircle, drawBars, drawWave]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block"
    />
  );
}
