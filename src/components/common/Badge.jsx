import { cn } from '../../utils/helpers';

const variantStyles = {
  success: 'bg-green-100 text-green-800 ring-green-600/20',
  warning: 'bg-amber-100 text-amber-800 ring-amber-600/20',
  danger: 'bg-red-100 text-red-800 ring-red-600/20',
  info: 'bg-blue-100 text-blue-800 ring-blue-600/20',
  default: 'bg-gray-100 text-gray-700 ring-gray-600/20',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full ring-1 ring-inset whitespace-nowrap',
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
