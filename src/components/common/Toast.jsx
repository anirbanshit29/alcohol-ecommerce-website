import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import useToastStore from '../../store/toastStore';
import { cn } from '../../utils/helpers';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: {
    icon: 'text-green-500',
    bg: 'bg-green-50 border-green-200',
    bar: 'bg-green-500',
  },
  error: {
    icon: 'text-red-500',
    bg: 'bg-red-50 border-red-200',
    bar: 'bg-red-500',
  },
  info: {
    icon: 'text-blue-500',
    bg: 'bg-blue-50 border-blue-200',
    bar: 'bg-blue-500',
  },
  warning: {
    icon: 'text-amber-500',
    bg: 'bg-amber-50 border-amber-200',
    bar: 'bg-amber-500',
  },
};

function ToastItem({ toast }) {
  const { dismissToast } = useToastStore();
  const colors = colorMap[toast.type] || colorMap.info;
  const Icon = iconMap[toast.type] || Info;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'relative flex items-start gap-3 w-80 p-4 rounded-xl border shadow-glass-lg overflow-hidden',
        'backdrop-blur-xl bg-white/90',
        colors.bg,
        toast.isExiting ? 'animate-toast-out' : 'animate-toast-in'
      )}
    >
      {/* Left color bar */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1 rounded-l-xl',
          colors.bar
        )}
      />

      {/* Icon */}
      <div className={cn('flex-shrink-0 mt-0.5', colors.icon)}>
        <Icon size={20} strokeWidth={2.5} />
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-medium text-dark-900 leading-snug pr-2">
        {toast.message}
      </p>

      {/* Dismiss button */}
      <button
        onClick={() => dismissToast(toast.id)}
        className="flex-shrink-0 p-1 rounded-lg text-dark-400 hover:text-dark-700 hover:bg-dark-100 transition-colors duration-150"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function Toast() {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default Toast;
