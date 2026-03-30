import { motion } from 'framer-motion';

// Simple wrapper to give student-facing pages a consistent
// animated header and content container.
function StudentLayout({ title, subtitle, actions, children }) {
  return (
    <section className="page-section">
      <div className="page-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <h1 className="page-title">{title}</h1>
            {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div className="dashboard-actions">{actions}</div> : null}
        </motion.div>

        {children}
      </div>
    </section>
  );
}

export default StudentLayout;

