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
      const url = '/billing/all'
      const res = await api.get(url)
      
      let fetchedBills = res.data;
      if (filterMonth) {
        fetchedBills = fetchedBills.filter(b => b.month === filterMonth)
      }
      setBills(fetchedBills)
    } catch (error) {
      toast.error('Failed to load billing records.')
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/students')
      console.log("Students:", res.data);
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }
  }

  useEffect(() => {
    fetchBills()
    fetchStudents()
  }, [filterMonth])

  console.log("Students state:", students);

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
                    <option value="" disabled>Select a student</option>
                    {students.length > 0 ? (
                      students.map((student) => ( 
                        <option key={student._id} value={student._id}>
                          {student.name || student.email} 
                        </option>
                      ))
                    ) : ( 
                      <option disabled>No students found</option>
                    )} 
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

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : bills.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <h3 style={{ color: 'var(--text-light)' }}>No bills available</h3>
            </div>
          ) : (
            <DataTable
              columns={[
                { key: 'student', header: 'Student Name' },
                { key: 'month', header: 'Month' },
                { key: 'amount', header: 'Amount' },
                { key: 'dueDate', header: 'Due Date' },
                { key: 'status', header: 'Status' },
                { key: 'actions', header: 'Action Button' },
              ]}
              rows={bills.map(b => ({
                id: b._id,
                student: b.studentName || b.studentId?.name || 'Unknown',
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
                actions: (
                  <div>
                    {b.status === 'pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(b._id, 'paid')} 
                        className="btn btn-outline" 
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: '#10b981', borderColor: '#10b981' }}
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
