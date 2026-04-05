import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function PaymentStatus() {
  const [payments, setPayments] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingBillId, setLoadingBillId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const studentId = user ? user._id : '';

        const [paymentsRes, billsRes] = await Promise.all([
          api.get('/student/payments'),
          api.get(`/billing/student/${studentId}`),
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

  const handlePayment = async (bill) => {
    try {
      setLoadingBillId(bill.id)
      
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      // 1. Create Order
      const { data: order } = await api.post('/payments/create-order', {
        amount: parseFloat(bill.rawAmount || bill.amount.replace('₹', '')),
        billId: bill.id
      })

      // 2. Open Razorpay Widget
      const options = {
        key: order.key,
        amount: order.amount,
        currency: 'INR',
        name: 'Yug Tiffin Services',
        description: `Bill for ${bill.month}`,
        order_id: order.orderId,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              billId: bill.id
            })
            
            toast.success('Payment successful!')
            
            // Refresh Data
            const [paymentsRes, billsRes] = await Promise.all([
              api.get('/student/payments'),
              api.get(`/billing/student/${user._id}`),
            ])
            setPayments(paymentsRes.data)
            setBills(billsRes.data)

          } catch (error) {
            toast.error('Payment verification failed.')
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#3b82f6'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response) {
        toast.error('Payment failed or cancelled.')
      })
      rzp.open()

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment')
    } finally {
      setLoadingBillId(null)
    }
  }

  return (
    <section className="page-section">
      <Toaster position="top-center" />
      <div className="page-container">
        <h1 className="page-title">Financial Status</h1>
        <p className="page-subtitle">
          Track your monthly mess bills and payment history.
        </p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div className="card">
              <h2 className="dashboard-title">Monthly Bills</h2>
              {bills.length === 0 ? <p style={{ color: 'var(--text-light)' }}>No bills available</p> : (
                <DataTable
                  columns={[
                    { key: 'month', header: 'Month' },
                    { key: 'amount', header: 'Amount Due' },
                    { key: 'dueDate', header: 'Due Date' },
                    { key: 'status', header: 'Status' },
                    { key: 'action', header: 'Action' },
                  ]}
                  rows={bills.map((b) => ({
                    id: b._id,
                    month: b.month,
                    amount: `₹${b.amount}`,
                    dueDate: new Date(b.dueDate).toLocaleDateString(),
                    status: (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: b.status === 'paid' ? '#10b981' : '#ef4444',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    ),
                    action: (
                      <button
                        className={`btn ${b.status === 'paid' ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handlePayment({ id: b._id, month: b.month, amount: b.amount })}
                        disabled={b.status === 'paid' || loadingBillId === b._id}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', opacity: b.status === 'paid' ? 0.5 : 1 }}
                      >
                        {loadingBillId === b._id ? 'Processing...' : b.status === 'paid' ? 'Paid' : 'Pay Now'}
                      </button>
                    )
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

