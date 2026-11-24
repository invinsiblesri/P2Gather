import { cn } from '../utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('h-7 w-7 rounded-full bg-electric flex items-center justify-center', className)}>
      <span className="text-white font-display font-bold text-xs">P2</span>
    </div>
  );
}
