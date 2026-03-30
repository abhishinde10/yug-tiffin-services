import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import DashboardCard from '../../components/DashboardCard.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeMemberships: 0,
    pendingPayments: 0,
    todaysParcels: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/admin/dashboard')
        setStats(res.data)
      } catch (error) {
        toast.error('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <>
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

          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <motion.div
              className="dashboard-grid"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <DashboardCard
                label="Total Students"
                value={stats.totalStudents}
                subtext="Registered users"
                icon="👥"
                accent="green"
              />
              <DashboardCard
                label="Active Memberships"
                value={stats.activeMemberships}
                subtext="With meal plan"
                icon="🍽️"
                accent="blue"
              />
              <DashboardCard
                label="Pending Payments"
                value={stats.pendingPayments}
                subtext="Students to follow up"
                icon="⏳"
                accent="orange"
              />
              <DashboardCard
                label="Today's Parcels"
                value={stats.todaysParcels}
                subtext="Pending orders"
                icon="📦"
                accent="purple"
              />
              <DashboardCard
                label="Monthly Revenue"
                value={`₹${stats.monthlyRevenue || 0}`}
                subtext="Paid this month"
                icon="💰"
                accent="green"
              />
            </motion.div>
          )}

          <section style={{ marginTop: '1.5rem', display: 'grid', gap: '1.5rem' }}>
            <p>Recent Payments and Parcel details are managed in their respective sections.</p>
          </section>
    </>
  )
}

export default AdminDashboard

