import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast from 'react-hot-toast'

function StudentManagement() {
  console.log("Student page rendering");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Form State
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    membershipPlan: 'none',
    paymentStatus: 'pending',
  }
  const [formData, setFormData] = useState(initialFormData)

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/students');
      console.log('Students data:', res.data);
      // Ensure we always set an array to prevent .filter() crash
      setStudents(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load students.');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Update Student
        await api.put(`/admin/update-student/${editingId}`, formData)
        toast.success('Student updated successfully')
        setEditingId(null)
      } else {
        // Add Student
        await api.post('/admin/add-student', formData)
        toast.success('Student added successfully')
      }
      fetchStudents()
      setFormData(initialFormData)
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${editingId ? 'update' : 'add'} student`)
    }
  }

  const handleEdit = (student) => {
    setEditingId(student._id)
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      password: '', // blank password unless wanting to change
      membershipPlan: student.membershipPlan,
      paymentStatus: student.paymentStatus,
    })
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(initialFormData)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/admin/delete-student/${id}`)
        toast.success('Student removed')
        fetchStudents()
      } catch (error) {
        toast.error('Failed to delete student')
      }
    }
  }

  // Filter Logic safely ensuring students is ALWAYS an array
  let activeFiltered = Array.isArray(students) ? students : [];
  
  if (filterStatus === 'active') {
    activeFiltered = activeFiltered.filter(s => s.membershipPlan !== 'none');
  } else if (filterStatus === 'inactive') {
    activeFiltered = activeFiltered.filter(s => s.membershipPlan === 'none');
  }

  const filteredStudents = activeFiltered.filter(s => {
    if (!s) return false;
    const nameMatch = (s.name || '').toLowerCase().includes(search.toLowerCase());
    const emailMatch = (s.email || '').toLowerCase().includes(search.toLowerCase());
    const phoneMatch = String(s.phone || '').includes(search);
    return nameMatch || emailMatch || phoneMatch;
  });

  if (!token) {
    return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Please login</h2>;
  }

  if (!user) return null;

  if (user.role !== "admin") {
    return <h2 style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>Unauthorized Access</h2>;
  }

  return (
    <>
          <div style={{ display: 'block', padding: '1rem', background: '#e0ffe0', border: '2px solid green', marginBottom: '1rem' }}>
             <h1 style={{ color: 'green', margin: 0 }}>Student Management Page Working (Router Verified)</h1>
          </div>
          <h1 className="dashboard-title">Student Management</h1>
          <p className="page-subtitle">Register and manage all students.</p>

          <div className="card form-card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
               <h2 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>
                 {editingId ? 'Update Student' : 'Add New Student'}
               </h2>
               {editingId && (
                 <button type="button" onClick={cancelEdit} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
                   Cancel
                 </button>
               )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <input type="text" name="name" className="input-field" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" className="input-field" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="text" name="phone" className="input-field" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input type="password" name="password" className="input-field" placeholder={editingId ? "New Password (Optional)" : "Temporary Password"} value={formData.password} onChange={handleChange} required={!editingId} />
              <select name="membershipPlan" className="input-field" value={formData.membershipPlan} onChange={handleChange}>
                <option value="none">No Plan</option>
                <option value="basic">Basic (Lunch/Dinner)</option>
                <option value="premium">Premium (Both + Parcel)</option>
              </select>
              <select name="paymentStatus" className="input-field" value={formData.paymentStatus} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>
                {editingId ? 'Save Changes' : 'Register Student'}
              </button>
            </form>
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button onClick={() => setFilterStatus('all')} className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1rem' }}>All</button>
               <button onClick={() => setFilterStatus('active')} className={`btn ${filterStatus === 'active' ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1rem' }}>Active</button>
               <button onClick={() => setFilterStatus('inactive')} className={`btn ${filterStatus === 'inactive' ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.5rem 1rem' }}>Inactive</button>
            </div>

            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by name, email, or phone..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>

          {loading ? (
            <p style={{ marginTop: '2rem', textAlign: 'center' }}>Loading students...</p>
          ) : filteredStudents.length === 0 ? (
            <div className="card" style={{ marginTop: '2rem', padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No Students Found</h3>
              <p style={{ color: 'var(--text-medium)' }}>
                {search || filterStatus !== 'all' 
                  ? "There are no students matching your current search or filter criteria." 
                  : "No students have been registered yet."}
              </p>
            </div>
          ) : (
            <DataTable
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'phone', header: 'Phone' },
                { key: 'role', header: 'Role' },
                { key: 'memberStatus', header: 'Status' },
                { key: 'actions', header: 'Actions' },
              ]}
              rows={filteredStudents.map(s => {
                if (!s) return { id: Math.random() };
                const isActive = s.membershipPlan !== 'none'
                return {
                  ...s,
                  name: s.name || "No Name",
                  memberStatus: (
                    <span className={`badge ${isActive ? 'badge-success' : 'badge-warning'}`}>
                       {isActive ? 'Active' : 'Inactive'}
                    </span>
                  ),
                  actions: (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                         onClick={() => handleEdit(s)}
                         className="btn btn-outline" 
                         style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                      >
                         Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(s._id)}
                        className="btn btn-outline" 
                        style={{ color: 'red', borderColor: 'red', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  )
                }
              })}
            />
          )}
    </>
  )
}

export default StudentManagement
