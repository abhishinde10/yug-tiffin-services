import { createContext, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const ToastContext = createContext(null);

let toastIdCounter = 1;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ type = 'info', title, message }) => {
    const id = toastIdCounter++;
    const toast = { id, type, title, message };
    setToasts((current) => [...current, toast]);

    // Auto-dismiss after a few seconds for a smooth UX.
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const value = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`toast toast-${toast.type}`}
            >
              {toast.title ? <div className="toast-title">{toast.title}</div> : null}
              {toast.message ? <div className="toast-message">{toast.message}</div> : null}
              <button
                type="button"
                className="toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;

