import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import DataTable from '../../components/DataTable.jsx'
import api from '../../services/api.js'
import toast, { Toaster } from 'react-hot-toast'

function MenuManagement() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
    date: '',
    lunchMenu: '',
    dinnerMenu: '',
  })
  
  const fetchMenus = async () => {
    try {
      const res = await api.get('/menu')
      setMenus(res.data)
    } catch (error) {
      toast.error('Failed to load menus.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenus()
  }, [])

  const parseMenuString = (menuStr) => {
    return menuStr.split(/[\n,]+/).map(item => item.trim()).filter(Boolean)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddMenu = async (event) => {
    event.preventDefault()
    
    const payload = {
      date: formData.date,
      lunchItems: parseMenuString(formData.lunchMenu),
      dinnerItems: parseMenuString(formData.dinnerMenu),
    }

    try {
      await api.post('/menu', payload)
      toast.success('Menu added successfully!')
      setFormData({ date: '', lunchMenu: '', dinnerMenu: '' })
      setShowAddForm(false)
      fetchMenus()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add menu.')
    }
  }

  const handleDeleteMenu = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      try {
        await api.delete(`/menu/${id}`)
        toast.success('Menu deleted')
        fetchMenus()
      } catch (error) {
        toast.error('Failed to delete menu')
      }
    }
  }

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="dashboard-title">Menu Management</h1>
              <p className="page-subtitle">Update daily lunch and dinner menus.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : 'Add New Menu'}
            </button>
          </div>

          {showAddForm && (
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Add Menu</h2>
              <form onSubmit={handleAddMenu} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Date</label>
                  <input type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Lunch Menu (comma separated)</label>
                  <textarea name="lunchMenu" className="input-field" value={formData.lunchMenu} onChange={handleChange} placeholder="e.g. Roti, Dal, Rice" rows="3" required />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem'}}>Dinner Menu (comma separated)</label>
                  <textarea name="dinnerMenu" className="input-field" value={formData.dinnerMenu} onChange={handleChange} placeholder="e.g. Chapati, Paneer" rows="3" required />
                </div>
                <button type="submit" className="btn btn-primary">Save Menu</button>
              </form>
            </div>
          )}

          {loading ? <p>Loading menus...</p> : (
            <DataTable
              columns={[
                { key: 'date', header: 'Date' },
                { key: 'lunch', header: 'Lunch Items' },
                { key: 'dinner', header: 'Dinner Items' },
                { key: 'actions', header: 'Actions' },
              ]}
              rows={menus.map(m => ({
                id: m._id,
                date: new Date(m.date).toLocaleDateString(),
                lunch: m.lunchItems.join(', '),
                dinner: m.dinnerItems.join(', '),
                actions: (
                  <button 
                    onClick={() => handleDeleteMenu(m._id)}
                    className="btn btn-outline" 
                    style={{color: 'red', borderColor: 'red', padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                  >
                    Delete
                  </button>
                )
              }))}
            />
          )}

    </>
  )
}

export default MenuManagement

