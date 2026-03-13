import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button.jsx';

// Generic modal with a backdrop and a simple header/footer structure.
// It is intentionally minimal so it can be reused across the app
// for confirmations, forms, or detail views.
function Modal({ isOpen, title, children, onClose, primaryAction, secondaryAction }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="Close"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            <div className="modal-body">{children}</div>

            {(primaryAction || secondaryAction) && (
              <div className="modal-footer">
                {secondaryAction ? (
                  <Button
                    variant={secondaryAction.variant ?? 'ghost'}
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                ) : null}
                {primaryAction ? (
                  <Button
                    variant={primaryAction.variant ?? 'primary'}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                ) : null}
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;

