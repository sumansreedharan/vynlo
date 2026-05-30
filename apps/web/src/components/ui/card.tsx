import { HTMLAttributes, forwardRef } from 'react';

// --- Card Container ---
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverEffect = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm shadow-xl transition-all duration-300 ${
        hoverEffect ? 'hover:border-zinc-700 hover:bg-zinc-900/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

// --- Card Header ---
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

// --- Card Title ---
export const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-sm font-semibold uppercase tracking-wider text-zinc-400 leading-none ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

// --- Card Description ---
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-xs text-zinc-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

// --- Card Content ---
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';