import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField.jsx'

function AdminLogin() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // In a real app you would validate admin credentials here
    navigate('/admin/dashboard')
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Admin Login</h1>
        <p className="page-subtitle">Manage students, billing, menu, and parcel orders.</p>

        <form onSubmit={handleSubmit} className="form">
          <FormField
            label="Admin Email"
            id="adminEmail"
            type="email"
            placeholder="Enter admin email"
            required
          />
          <FormField
            label="Password"
            id="adminPassword"
            type="password"
            placeholder="Enter password"
            required
          />
          <button type="submit" className="btn btn-primary form-submit">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin

