'use client';

import { Fragment, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && closeOnEscape) onClose();
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[400] animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 animate-slide-up">
        <div
          className={cn(
            'w-full bg-white dark:bg-secondary-900 rounded-2xl shadow-xl overflow-hidden',
            sizes[size]
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          onKeyDown={handleKeyDown}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-secondary-100 dark:border-secondary-800">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-xl font-semibold text-secondary-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}