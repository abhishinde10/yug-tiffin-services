import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar.jsx';

// Shared shell for all admin pages so the sidebar, spacing,
// and header styling stay consistent across the panel.
function AdminLayout({ title, subtitle, actions, children }) {
  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <motion.header
            className="dashboard-header"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <h1 className="dashboard-title">{title}</h1>
              {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
            </div>
            {actions ? <div className="dashboard-actions">{actions}</div> : null}
          </motion.header>

          {children}
        </main>
      </div>
    </section>
  );
}

export default AdminLayout;

