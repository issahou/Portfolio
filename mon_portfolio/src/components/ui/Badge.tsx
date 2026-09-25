import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  dotColor?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, dotColor, children, ...props }, ref) => {
    const variants = {
      default: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300',
      primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
      secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300',
      success: 'bg-success-50 text-success-600 dark:bg-success-50/20 dark:text-success-500',
      warning: 'bg-warning-50 text-warning-600 dark:bg-warning-50/20 dark:text-warning-500',
      error: 'bg-error-50 text-error-600 dark:bg-error-50/20 dark:text-error-500',
      outline: 'bg-transparent border border-secondary-200 text-secondary-700 dark:border-secondary-700 dark:text-secondary-300',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1.5 text-base gap-2',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor || 'currentColor' }} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';