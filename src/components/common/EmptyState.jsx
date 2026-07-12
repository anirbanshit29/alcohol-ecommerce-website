import { PackageOpen } from 'lucide-react';
import { cn } from '../../utils/helpers';

function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Nothing here yet',
  description = '',
  actionLabel = '',
  onAction = null,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-in-up',
        className
      )}
    >
      {/* Icon container */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-50 mb-6">
        <Icon size={36} className="text-primary" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-semibold text-dark-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-dark-500 text-sm max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* CTA Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-800 active:scale-[0.97] transition-all duration-200 shadow-premium"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
