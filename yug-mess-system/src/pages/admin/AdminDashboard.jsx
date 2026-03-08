import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar.jsx'
import DashboardCard from '../../components/DashboardCard.jsx'
import DataTable from '../../components/DataTable.jsx'

const recentPayments = [
  { id: 1, student: 'Rahul Sharma', amount: '₹3,500', method: 'UPI', date: '05 Mar', status: 'Paid' },
  { id: 2, student: 'Priya Patel', amount: '₹3,500', method: 'Cash', date: '04 Mar', status: 'Paid' },
  { id: 3, student: 'Amit Desai', amount: '₹4,000', method: 'UPI', date: '03 Mar', status: 'Pending' },
]

const todayParcels = [
  { id: 1, student: 'Rahul Sharma', meal: 'Dinner', time: '8:00 PM', status: 'Packed' },
  { id: 2, student: 'Priya Patel', meal: 'Lunch', time: '1:00 PM', status: 'Booked' },
  { id: 3, student: 'Amit Desai', meal: 'Dinner', time: '8:30 PM', status: 'Cancelled' },
]

function AdminDashboard() {
  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <motion.header
            className="dashboard-header"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              Overview of students, income, payments, and parcel orders.
            </p>
          </motion.header>

          <motion.div
            className="dashboard-grid"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <DashboardCard
              label="Total Students"
              value="120"
              subtext="Active memberships"
              icon="👥"
              accent="green"
            />
            <DashboardCard
              label="Monthly Income"
              value="₹4,20,000"
              subtext="This month (approx.)"
              icon="💰"
              accent="blue"
            />
            <DashboardCard
              label="Pending Payments"
              value="₹18,000"
              subtext="Students to follow up"
              icon="⏳"
              accent="orange"
            />
            <DashboardCard
              label="Parcel Orders"
              value="42"
              subtext="This week"
              icon="📦"
              accent="purple"
            />
          </motion.div>

          <section style={{ marginTop: '1.5rem', display: 'grid', gap: '1.5rem' }}>
            <div>
              <h2 className="dashboard-title">Recent Payments</h2>
              <p className="page-subtitle">Latest payments from students with status badges.</p>
              <DataTable
                columns={[
                  { key: 'student', header: 'Student' },
                  { key: 'amount', header: 'Amount' },
                  { key: 'method', header: 'Method' },
                  { key: 'date', header: 'Date' },
                  { key: 'status', header: 'Status' },
                ]}
                rows={recentPayments.map((row) => ({
                  ...row,
                  status: (
                    <span
                      className={`badge ${
                        row.status === 'Paid' ? 'badge-success' : 'badge-warning'
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                }))}
              />
            </div>

            <div>
              <h2 className="dashboard-title">Today&apos;s Parcel Orders</h2>
              <p className="page-subtitle">Quick view of parcels to prepare and pack.</p>
              <DataTable
                columns={[
                  { key: 'student', header: 'Student' },
                  { key: 'meal', header: 'Meal' },
                  { key: 'time', header: 'Time' },
                  { key: 'status', header: 'Status' },
                ]}
                rows={todayParcels.map((row) => ({
                  ...row,
                  status: (
                    <span
                      className={`badge ${
                        row.status === 'Packed'
                          ? 'badge-success'
                          : row.status === 'Booked'
                          ? 'badge-info'
                          : 'badge-danger'
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                }))}
              />
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}

export default AdminDashboard

