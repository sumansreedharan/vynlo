import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

// Define the available styling variations
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  
  // Base structural classes matching the zinc-and-glass theme
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]';
  
  // Premium visual theme mappings
  const variants = {
    primary: 'bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_1px_2px_rgba(255,255,255,0.2)_inset]',
    secondary: 'bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700 backdrop-blur-sm',
    ghost: 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40',
    destructive: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300',
  };

  // Dimensional padding and text mapping
  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        <>
          {icon && <span className="flex items-center shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}