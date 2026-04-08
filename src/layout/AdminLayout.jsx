import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

function AdminLayout() {
  return (
    <div className="admin-page">
      <section className="page-section" style={{ paddingTop: '90px' }}>
        <div className="admin-layout">
          <Sidebar />
          <div className="admin-content" style={{ flex: 1 }}>
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminLayout;

