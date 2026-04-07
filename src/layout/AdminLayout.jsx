import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

function AdminLayout() {
  return (
    <section className="page-section" style={{ paddingTop: '90px' }}>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-content" style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AdminLayout;

