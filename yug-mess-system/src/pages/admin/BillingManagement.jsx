import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'

const billingRows = [
  { id: 1, student: 'Rahul Sharma', month: 'March', amount: '₹3500', status: 'Pending' },
  { id: 2, student: 'Priya Patel', month: 'March', amount: '₹3500', status: 'Paid' },
]

function BillingManagement() {
  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <h1 className="dashboard-title">Billing Management</h1>
          <p className="page-subtitle">Track monthly bills and payment status for all students.</p>

          <DataTable
            columns={[
              { key: 'student', header: 'Student' },
              { key: 'month', header: 'Month' },
              { key: 'amount', header: 'Amount' },
              { key: 'status', header: 'Status' },
            ]}
            rows={billingRows}
          />
        </main>
      </div>
    </section>
  )
}

export default BillingManagement

