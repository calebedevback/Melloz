import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration === 0) return;
    
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(toast.id), 300);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const configs = {
    success: {
      icon: Check,
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      light: 'text-emerald-200',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-rose-500/20',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      light: 'text-rose-200',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      light: 'text-blue-200',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      light: 'text-amber-200',
    },
  };

  const config = configs[toast.type];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-lg
        ${config.bg} border ${config.border}
        backdrop-blur-md animate-slide-in-right
        transition-all duration-300
        ${isExiting ? 'opacity-0 translate-x-full' : ''}
      `}
    >
      <Icon size={20} className={`${config.text} mt-0.5 flex-shrink-0`} />
      <div className="flex-1">
        <p className={`font-semibold text-sm ${config.light}`}>{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-zinc-400 mt-1">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(toast.id), 300);
        }}
        className="text-zinc-500 hover:text-zinc-300 flex-shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-28 right-4 z-40 flex flex-col gap-2 max-w-sm pointer-events-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

// Hook para usar toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, title, message, duration };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (title: string, message?: string, duration?: number) => addToast('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) => addToast('error', title, message, duration),
    info: (title: string, message?: string, duration?: number) => addToast('info', title, message, duration),
    warning: (title: string, message?: string, duration?: number) => addToast('warning', title, message, duration),
  };
};

export default Toast;
