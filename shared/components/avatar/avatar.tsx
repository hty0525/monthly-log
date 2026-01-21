import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type AvatarProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback?: string;
  };

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
            // eslint-disable-next-line @next/next/no-img-element
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium">
            {fallback || alt?.charAt(0).toUpperCase() || '?'}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
