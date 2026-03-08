import DataTable from '../../components/DataTable.jsx'

const payments = [
  { id: 1, month: 'January', amount: '₹3500', status: 'Paid' },
  { id: 2, month: 'February', amount: '₹3500', status: 'Paid' },
  { id: 3, month: 'March', amount: '₹3500', status: 'Pending' },
]

function PaymentStatus() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Payment Status</h1>
        <p className="page-subtitle">
          Track your monthly mess bill, due amounts, and payment history.
        </p>

        <DataTable
          columns={[
            { key: 'month', header: 'Month' },
            { key: 'amount', header: 'Amount' },
            { key: 'status', header: 'Status' },
          ]}
          rows={payments}
        />
      </div>
    </section>
  )
}

export default PaymentStatus

