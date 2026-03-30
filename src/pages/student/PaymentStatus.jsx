import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function PaymentStatus() {
  const [payments, setPayments] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsRes, billsRes] = await Promise.all([
          api.get('/student/payments'),
          api.get('/billing'),
        ])
        setPayments(paymentsRes.data)
        setBills(billsRes.data)
      } catch (error) {
        toast.error('Failed to load financial records.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="page-section">
      <Toaster position="top-center" />
      <div className="page-container">
        <h1 className="page-title">Financial Status</h1>
        <p className="page-subtitle">
          Track your monthly mess bills and payment history.
        </p>

        {loading ? <p>Loading financial data...</p> : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div className="card">
              <h2 className="dashboard-title">Monthly Bills</h2>
              {bills.length === 0 ? <p>No bills generated yet.</p> : (
                <DataTable
                  columns={[
                    { key: 'month', header: 'Month' },
                    { key: 'amount', header: 'Amount Due' },
                    { key: 'dueDate', header: 'Due Date' },
                    { key: 'status', header: 'Status' },
                  ]}
                  rows={bills.map((b) => ({
                    id: b._id,
                    month: b.month,
                    amount: `₹${b.amount}`,
                    dueDate: new Date(b.dueDate).toLocaleDateString(),
                    status: (
                      <span className={`badge ${b.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                        {b.status.toUpperCase()}
                      </span>
                    ),
                  }))}
                />
              )}
            </div>

            <div className="card">
              <h2 className="dashboard-title">Payment History</h2>
              {payments.length === 0 ? <p>No payment records found.</p> : (
                <DataTable
                  columns={[
                    { key: 'month', header: 'Month' },
                    { key: 'amount', header: 'Amount' },
                    { key: 'status', header: 'Status' },
                    { key: 'paymentDate', header: 'Date Paid' },
                  ]}
                  rows={payments.map((p) => ({
                    id: p._id,
                    month: p.month,
                    amount: `₹${p.amount}`,
                    status: (
                      <span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                        {p.status.toUpperCase()}
                      </span>
                    ),
                    paymentDate: p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'Pending',
                  }))}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PaymentStatus

