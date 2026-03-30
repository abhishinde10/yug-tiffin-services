import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function ParcelOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders')
      setOrders(res.data)
    } catch (error) {
      toast.error('Failed to load parcel orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}`, { status: newStatus })
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <h1 className="dashboard-title">Parcel Orders</h1>
      <p className="page-subtitle">View and manage all parcel bookings.</p>

      {loading ? <p>Loading orders...</p> : (
        <DataTable
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'date', header: 'Date' },
            { key: 'meal', header: 'Meal' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions' },
          ]}
              rows={orders.map(order => ({
                id: order._id,
                student: order.studentId?.name || 'Unknown',
                date: new Date(order.orderDate).toLocaleDateString(),
                meal: order.mealType.charAt(0).toUpperCase() + order.mealType.slice(1),
                status: (
                   <span
                      className={`badge ${
                        order.status === 'approved'
                          ? 'badge-success'
                          : order.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-danger'
                      }`}
                    >
                      {order.status.toUpperCase()}
                  </span>
                ),
                actions: (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(order._id, 'approved')} 
                        className="btn btn-outline" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                      >
                        Approve
                      </button>
                    )}
                    {order.status === 'pending' && (
                      <button 
                         onClick={() => handleUpdateStatus(order._id, 'rejected')} 
                         className="btn btn-outline" 
                         style={{ color: 'red', borderColor: 'red', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                      >
                        Reject
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

export default ParcelOrders

