import { cn } from '../utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-9 h-9", className)}>
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="14" cy="18" r="11" stroke="url(#logo-g1)" strokeWidth="2" opacity="0.8" />
        <circle cx="22" cy="18" r="11" stroke="url(#logo-g2)" strokeWidth="2" opacity="0.6" />
        <path d="M17 13L23 18L17 23V13Z" fill="url(#logo-g3)" />
        <defs>
          <linearGradient id="logo-g1" x1="3" y1="7" x2="25" y2="29">
            <stop stopColor="#C8E64A" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="logo-g2" x1="11" y1="7" x2="33" y2="29">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="logo-g3" x1="17" y1="13" x2="23" y2="23">
            <stop stopColor="#C8E64A" />
            <stop offset="1" stopColor="#F0F0F5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
