import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'

const students = [
  { id: 1, name: 'Rahul Sharma', plan: 'Standard', status: 'Active' },
  { id: 2, name: 'Priya Patel', plan: 'Premium', status: 'Active' },
  { id: 3, name: 'Amit Desai', plan: 'Basic', status: 'Pending' },
]

function StudentManagement() {
  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <h1 className="dashboard-title">Student Management</h1>
          <p className="page-subtitle">View and manage all registered students.</p>

          <DataTable
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'plan', header: 'Plan' },
              { key: 'status', header: 'Status' },
            ]}
            rows={students}
          />
        </main>
      </div>
    </section>
  )
}

export default StudentManagement

