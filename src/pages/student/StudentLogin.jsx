import { useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField.jsx'

function StudentLogin() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // In a real app you would validate against an API here
    navigate('/student/dashboard')
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Student Login</h1>
        <p className="page-subtitle">Access your meals, parcels, and payments in one place.</p>

        <form onSubmit={handleSubmit} className="form">
          <FormField
            label="Student ID or Phone"
            id="studentId"
            placeholder="Enter your registered student ID or phone"
            required
          />
          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
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

export default StudentLogin

