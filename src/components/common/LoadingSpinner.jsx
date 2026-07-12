import { cn } from '../../utils/helpers';

const sizeMap = {
  sm: { spinner: 'h-5 w-5 border-2', text: 'text-xs' },
  md: { spinner: 'h-8 w-8 border-[3px]', text: 'text-sm' },
  lg: { spinner: 'h-12 w-12 border-4', text: 'text-base' },
};

function LoadingSpinner({ size = 'md', text = '' }) {
  const styles = sizeMap[size] || sizeMap.md;

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-label={text || 'Loading'}
    >
      <div
        className={cn(
          'rounded-full border-primary/20 border-t-primary animate-spin',
          styles.spinner
        )}
      />
      {text && (
        <p className={cn('text-dark-500 font-medium', styles.text)}>{text}</p>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-xl bg-white shadow-card overflow-hidden animate-fade-in"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="skeleton h-48 w-full" />

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="skeleton h-4 w-3/4 rounded" />

        {/* Brand & volume */}
        <div className="skeleton h-3 w-1/2 rounded" />

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-3.5 w-3.5 rounded-full" />
          ))}
          <div className="skeleton h-3 w-8 rounded ml-1" />
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
