import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardCard from '../../components/DashboardCard.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState({
    membershipDetails: { plan: 'Loading...', joinDate: null },
    paymentStatus: 'Loading...',
    parcelHistory: [],
  })
  const [bills, setBills] = useState([])
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/student/dashboard')
        setDashboardData(res.data)
      } catch (error) {
        toast.error('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    const fetchBills = async () => {
      try {
        const res = await api.get('/student/bills')
        setBills(res.data)
      } catch (error) {
        console.error('Failed to load bills')
      }
    }

    const fetchMenu = async () => {
      try {
        const res = await api.get('/menu/today')
        console.log("Menu Data:", res.data)
        setMenu(res.data)
      } catch (error) {
        console.error('Failed to load menu data', error)
      }
    }

    fetchDashboard()
    fetchBills()
    fetchMenu()
  }, [])

  // Format parcel history for DataTable
  const upcomingParcels = dashboardData.parcelHistory.map((parcel) => ({
    id: parcel._id,
    date: new Date(parcel.orderDate).toLocaleDateString(),
    meal: parcel.mealType.charAt(0).toUpperCase() + parcel.mealType.slice(1),
    status: parcel.status.charAt(0).toUpperCase() + parcel.status.slice(1),
  }))

  const myBillsRows = bills.map(b => ({
    id: b._id,
    monthYear: `${b.month} ${b.year || ''}`.trim(),
    amount: `₹${b.amount}`,
    dueDate: new Date(b.dueDate).toLocaleDateString(),
    status: (
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.4rem', 
        fontWeight: 'bold',
        color: b.status === 'paid' ? 'var(--primary)' : '#dc2626'
      }}>
        {b.status === 'paid' ? '🟢 Paid' : '🔴 Pending'}
      </span>
    )
  }))

  return (
    <section className="page-section">
      <Toaster position="top-center" />
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

        {loading ? (
          <p>Loading your dashboard...</p>
        ) : (
          <>
            <motion.div
              className="dashboard-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <DashboardCard 
                label="Plan" 
                value={dashboardData.membershipDetails.plan.toUpperCase()} 
                subtext="Active" 
                icon="🥗" 
              />
              <DashboardCard 
                label="Payment Status" 
                value={dashboardData.paymentStatus.toUpperCase()} 
                subtext="Most recent" 
                icon="✅" 
                accent="green" 
              />
              <DashboardCard 
                label="Parcel History" 
                value={dashboardData.parcelHistory.length.toString()} 
                subtext="Total orders" 
                icon="📦" 
                accent="purple" 
              />
            </motion.div>

            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
              <div className="card">
                <h2 className="dashboard-title">Today&apos;s Menu</h2>
                <p className="page-subtitle">Fresh, home-style food for lunch and dinner.</p>

                {menu ? (
                  <div className="menu-cards">
                    <div className="menu-card">
                      <div className="menu-header">
                        <h3 className="menu-title">Lunch</h3>
                        <span className="menu-time">12:00 PM – 2:00 PM</span>
                      </div>
                      <ul className="menu-items">
                        {menu.lunchItems.map((item, idx) => (
                          <li key={idx} className="menu-item">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="menu-card">
                      <div className="menu-header">
                        <h3 className="menu-title">Dinner</h3>
                        <span className="menu-time">7:00 PM – 9:00 PM</span>
                      </div>
                      <ul className="menu-items">
                        {menu.dinnerItems.map((item, idx) => (
                          <li key={idx} className="menu-item">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>No menu available today</p>
                )}

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
                <h2 className="dashboard-title">My Bills</h2>
                {myBillsRows.length > 0 ? (
                  <DataTable
                    columns={[
                      { key: 'monthYear', header: 'Billing Period' },
                      { key: 'amount', header: 'Amount' },
                      { key: 'dueDate', header: 'Due Date' },
                      { key: 'status', header: 'Status' },
                    ]}
                    rows={myBillsRows}
                  />
                ) : (
                  <p style={{ margin: '1rem 0' }}>You have no pending or past bills.</p>
                )}

                <h2 className="dashboard-title" style={{ marginTop: '2rem' }}>Recent Parcel Bookings</h2>
                {upcomingParcels.length > 0 ? (
                  <DataTable
                    columns={[
                      { key: 'date', header: 'Date' },
                      { key: 'meal', header: 'Meal' },
                      { key: 'status', header: 'Status' },
                    ]}
                    rows={upcomingParcels}
                  />
                ) : (
                  <p style={{ margin: '1rem 0' }}>You have no recent parcel bookings.</p>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  )
}

export default StudentDashboard
