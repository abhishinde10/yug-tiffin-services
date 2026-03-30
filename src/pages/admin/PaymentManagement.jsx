import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function PaymentManagement() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterMonth, setFilterMonth] = useState('')

  const fetchPayments = async () => {
    try {
      const res = await api.get('/payments')
      let data = res.data
      if (filterMonth) {
        data = data.filter(p => p.month.toLowerCase().includes(filterMonth.toLowerCase()))
      }
      setPayments(data)
    } catch (error) {
      toast.error('Failed to load payment records.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [filterMonth])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/payments/${id}`, { status: newStatus })
      toast.success('Payment status updated')
      fetchPayments()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <>
          <Toaster position="top-center" />
          <h1 className="dashboard-title">Payment Management</h1>
          <p className="page-subtitle">Track payment history and mark pending payments as paid.</p>

          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
            <span style={{fontSize: '0.875rem'}}>Filter by Month:</span>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. April 2024" 
              value={filterMonth} 
              onChange={e => setFilterMonth(e.target.value)}
              style={{ maxWidth: '200px' }}
            />
          </div>

          {loading ? <p>Loading payment data...</p> : (
            <DataTable
              columns={[
                { key: 'student', header: 'Student Name' },
                { key: 'month', header: 'Month' },
                { key: 'amount', header: 'Amount' },
                { key: 'status', header: 'Status' },
                { key: 'paymentDate', header: 'Paid On' },
                { key: 'actions', header: 'Actions' },
              ]}
              rows={payments.map(p => ({
                id: p._id,
                student: p.studentId?.name || 'Unknown',
                month: p.month,
                amount: `₹${p.amount}`,
                status: (
                  <span
                    className={`badge ${
                      p.status === 'paid' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                ),
                paymentDate: p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A',
                actions: (
                  <div>
                    {p.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(p._id, 'paid')} 
                        className="btn btn-outline" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                )
              }))}
            />
          )}
    </>
  )
}

export default PaymentManagement
