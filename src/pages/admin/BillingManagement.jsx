import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function BillingManagement() {
  const [bills, setBills] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterMonth, setFilterMonth] = useState('')
  const [showGenerateForm, setShowGenerateForm] = useState(false)
  const currentYear = new Date().getFullYear()
  const currentMonthIndex = new Date().getMonth()

  const [generateData, setGenerateData] = useState({ 
    studentId: '', 
    month: MONTHS[currentMonthIndex], 
    year: currentYear.toString(), 
    amount: 1500, 
    dueDate: '' 
  })

  const fetchBills = async () => {
    try {
      const url = filterMonth ? `/admin/bills?month=${encodeURIComponent(filterMonth)}` : '/admin/bills'
      const res = await api.get(url)
      setBills(res.data)
    } catch (error) {
      toast.error('Failed to load billing records.')
    } finally {
      setLoading(false)
    }
  }

  const fetchActiveStudents = async () => {
    try {
      const res = await api.get('/admin/students')
      setStudents(res.data.filter(s => s.membershipPlan !== 'none'))
    } catch (error) { // silent catch for background populate
    }
  }

  useEffect(() => {
    fetchBills()
    fetchActiveStudents()
  }, [filterMonth])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/billing/${id}/pay`, { status: newStatus })
      toast.success('Bill marked as paid')
      fetchBills()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleGenerateBills = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/billing/create', generateData)
      toast.success(res.data.message)
      setShowGenerateForm(false)
      fetchBills()
      setGenerateData({ ...generateData, studentId: '' }) // Reset selected student
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate bill')
    }
  }

  // Generate an array of years for the dropdown
  const years = [currentYear - 1, currentYear, currentYear + 1]

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="dashboard-title">Billing Management</h1>
              <p className="page-subtitle">Generate bills for individual active students.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowGenerateForm(!showGenerateForm)}>
              {showGenerateForm ? 'Cancel Form' : 'Generate Bill'}
            </button>
          </div>

          {showGenerateForm && (
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Generate Bill for Student</h2>
              <form onSubmit={handleGenerateBills} className="billing-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 500}}>Student</label>
                  <select className="input-field" value={generateData.studentId} onChange={e => setGenerateData({...generateData, studentId: e.target.value})} required>
                    <option value="" disabled>Select a student...</option>
                    {students.map(s => (
                      <option key={s._id} value={s._id}>{s.name} ({s.phone})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 500}}>Month</label>
                  <select className="input-field" value={generateData.month} onChange={e => setGenerateData({...generateData, month: e.target.value})} required>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 500}}>Year</label>
                  <select className="input-field" value={generateData.year} onChange={e => setGenerateData({...generateData, year: e.target.value})} required>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 500}}>Amount (₹)</label>
                  <input type="number" className="input-field" min="1" value={generateData.amount} onChange={e => setGenerateData({...generateData, amount: e.target.value})} required />
                </div>
                
                <div style={{ position: 'relative' }}>
                  <label style={{display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: 500}}>Due Date </label>
                  <input type="date" className="input-field styled-date" value={generateData.dueDate} onChange={e => setGenerateData({...generateData, dueDate: e.target.value})} required />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Generate</button>
              </form>
            </div>
          )}

          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
            <span style={{fontSize: '0.875rem'}}>Filter Month:</span>
            <select 
              className="input-field" 
              value={filterMonth} 
              onChange={e => setFilterMonth(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="">All Months</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {loading ? <p>Loading billing data...</p> : (
            <DataTable
              columns={[
                { key: 'student', header: 'Student Name' },
                { key: 'monthYear', header: 'Billing Period' },
                { key: 'amount', header: 'Amount' },
                { key: 'dueDate', header: 'Due Date' },
                { key: 'status', header: 'Status' },
                { key: 'actions', header: 'Actions' },
              ]}
              rows={bills.map(b => ({
                id: b._id,
                student: b.studentName || b.studentId?.name || 'Unknown',
                monthYear: `${b.month} ${b.year || ''}`.trim(),
                amount: `₹${b.amount}`,
                dueDate: new Date(b.dueDate).toLocaleDateString(),
                status: (
                  <span
                    className={`badge ${
                      b.status === 'paid' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                ),
                actions: (
                  <div>
                    {b.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(b._id, 'paid')} 
                        className="btn btn-outline" 
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: '#16a34a', borderColor: '#16a34a' }}
                      >
                        ✓ Mark Paid
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

export default BillingManagement
