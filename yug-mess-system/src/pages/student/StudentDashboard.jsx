import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardCard from '../../components/DashboardCard.jsx'
import DataTable from '../../components/DataTable.jsx'

const upcomingParcels = [
  { id: 1, date: '05 Mar', meal: 'Dinner', status: 'Booked' },
  { id: 2, date: '06 Mar', meal: 'Lunch', status: 'Pending' },
]

function StudentDashboard() {
  return (
    <section className="page-section">
      <div className="page-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="page-title">Student Dashboard</h1>
          <p className="page-subtitle">
            View today&apos;s menu, manage parcel bookings, and check your payment status.
          </p>
        </motion.div>

        <motion.div
          className="dashboard-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <DashboardCard label="Plan" value="Standard (Lunch + Dinner)" subtext="Active" icon="🥗" />
          <DashboardCard label="This Month Meals" value="48" subtext="Updated daily" icon="📅" accent="blue" />
          <DashboardCard label="Outstanding" value="₹0" subtext="All payments cleared" icon="✅" accent="green" />
          <DashboardCard label="Parcel Bookings" value="3" subtext="This week" icon="📦" accent="purple" />
        </motion.div>

        <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
          <div className="card">
            <h2 className="dashboard-title">Today&apos;s Menu</h2>
            <p className="page-subtitle">Fresh, home-style food for lunch and dinner.</p>

            <div className="menu-cards">
              <div className="menu-card">
                <div className="menu-header">
                  <h3 className="menu-title">Lunch</h3>
                  <span className="menu-time">12:00 PM – 2:00 PM</span>
                </div>
                <ul className="menu-items">
                  <li className="menu-item">
                    <span>4 Roti / Chapati</span>
                  </li>
                  <li className="menu-item">
                    <span>Dal Tadka</span>
                  </li>
                  <li className="menu-item">
                    <span>Steamed Rice</span>
                  </li>
                  <li className="menu-item">
                    <span>Mix Veg Sabji</span>
                  </li>
                </ul>
              </div>

              <div className="menu-card">
                <div className="menu-header">
                  <h3 className="menu-title">Dinner</h3>
                  <span className="menu-time">7:00 PM – 9:00 PM</span>
                </div>
                <ul className="menu-items">
                  <li className="menu-item">
                    <span>4 Chapati</span>
                  </li>
                  <li className="menu-item">
                    <span>Paneer Butter Masala</span>
                  </li>
                  <li className="menu-item">
                    <span>Jeera Rice</span>
                  </li>
                  <li className="menu-item">
                    <span>Dal Fry</span>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/student/parcel-booking" className="btn btn-primary">
                Book Parcel
              </Link>
              <Link to="/student/payment-status" className="btn btn-secondary">
                View Payment Status
              </Link>
            </div>
          </div>

          <div>
            <h2 className="dashboard-title">Upcoming Parcel Bookings</h2>
            <DataTable
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'meal', header: 'Meal' },
                { key: 'status', header: 'Status' },
              ]}
              rows={upcomingParcels}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentDashboard

