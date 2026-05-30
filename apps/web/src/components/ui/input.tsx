import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

// ForwardRef allows the input to seamlessly work with form libraries like React Hook Form if you use them later
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {/* Render label if passed */}
        {label && (
          <label 
            htmlFor={id} 
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Side Prefix Icon */}
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              {icon}
            </div>
          )}

          <input
            id={id}
            ref={ref}
            className={`w-full rounded-xl border bg-zinc-950/50 p-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition duration-200 focus:ring-1 disabled:opacity-50 disabled:pointer-events-none ${
              icon ? 'pl-11' : 'pl-4'
            } ${
              error
                ? 'border-red-500/40 focus:border-red-500 focus:ring-red-500/50'
                : 'border-zinc-800 focus:border-zinc-500 focus:ring-zinc-500'
            } ${className}`}
            {...props}
          />
        </div>

        {/* Dynamic Inline Error State Feedback */}
        {error && (
          <p className="text-xs text-red-400 animate-in fade-in-50 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;