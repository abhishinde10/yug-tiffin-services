import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider.jsx';

// Small convenience hook that exposes the toast API to any component.
// Usage is intentionally simple:
//   const { addToast } = useToast();
//   addToast({ type: 'success', title: 'Saved', message: 'Changes stored successfully.' });
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

