import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variant === 'primary' ? 'btn-solid' : 'btn-ghost',
        size === 'sm' && 'text-xs px-4 py-2',
        size === 'lg' && 'text-base px-8 py-4',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}
