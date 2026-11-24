import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand-lime text-bg-canvas font-semibold hover:brightness-110 active:scale-95 shadow-glow-lime',
    secondary: 'bg-brand-indigo text-white font-semibold hover:brightness-110 active:scale-95',
    outline: 'glass glass-hover text-text-primary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-base',
    icon: 'p-2.5',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-pill font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-lime/30 focus:ring-offset-2 focus:ring-offset-bg-canvas disabled:opacity-40 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
