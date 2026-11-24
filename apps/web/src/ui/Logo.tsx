import { cn } from '../utils/cn';

export function Logo({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-14 w-14',
  };

  return (
    <img
      src="/images/logo.jpg"
      alt="P2Gather"
      className={cn(sizes[size], 'rounded-xl object-cover', className)}
    />
  );
}
