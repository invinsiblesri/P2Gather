import { cn } from '../utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className={cn("w-8 h-8", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="text-brand-indigo" />
      <circle cx="14" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="text-brand-mint opacity-60" />
      <path d="M11 9L15 12L11 15V9Z" fill="currentColor" className="text-text-primary" />
    </svg>
  );
}
