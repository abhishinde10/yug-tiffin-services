import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'

const parcelOrders = [
  { id: 1, student: 'Rahul Sharma', date: '05 Mar', meal: 'Dinner', status: 'Packed' },
  { id: 2, student: 'Priya Patel', date: '05 Mar', meal: 'Lunch', status: 'Booked' },
  { id: 3, student: 'Amit Desai', date: '06 Mar', meal: 'Dinner', status: 'Cancelled' },
]

function ParcelOrders() {
  return (
    <section className="page-section" style={{ paddingTop: '2rem' }}>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <h1 className="dashboard-title">Parcel Orders</h1>
          <p className="page-subtitle">View and manage all parcel bookings.</p>

          <DataTable
            columns={[
              { key: 'student', header: 'Student' },
              { key: 'date', header: 'Date' },
              { key: 'meal', header: 'Meal' },
              { key: 'status', header: 'Status' },
            ]}
            rows={parcelOrders}
          />
        </main>
      </div>
    </section>
  )
}

export default ParcelOrders

