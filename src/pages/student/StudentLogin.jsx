import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import FormField from '../../components/FormField.jsx'
import api from '../../services/api.js'

function StudentLogin() {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      if (isRegistering) {
        // Register Student
        const res = await api.post('/auth/register-student', formData)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        toast.success('Registration successful!')
        navigate('/student/dashboard')
      } else {
        // Login Student
        const res = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        })
        
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data))
        toast.success('Login successful!')
        navigate('/student/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
      <Toaster position="top-center" />
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: 'var(--white)',
          padding: '3rem 2.5rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          width: '100%',
          maxWidth: '460px',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 1.25rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.8rem', fontWeight: 'bold', boxShadow: 'var(--shadow-md)'
          }}>
            Y
          </div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            {isRegistering ? 'Student Registration' : 'Welcome back'}
          </h1>
          <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem' }}>
            {isRegistering 
              ? 'Join our mess and enjoy delicious meals.' 
              : 'Please enter your account details to access your dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {isRegistering && (
            <>
              <FormField
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              <FormField
                label="Phone Number"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </>
          )}

          <FormField
            label="Email Address"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@example.com"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          
          <div className="form-row" style={{ position: 'relative' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
               <input
                 id="password"
                 type={showPassword ? "text" : "password"}
                 className="form-input"
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="Enter your password"
                 required
                 style={{ width: '100%', paddingRight: '3rem' }}
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 style={{
                   position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                   background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                   color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                 }}
                 title={showPassword ? "Hide password" : "Show password"}
               >
                 {showPassword ? '👁️‍🗨️' : '👁️'}
               </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.85rem' }}
          >
            {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-medium)' }}>
          <p>
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              type="button" 
              style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', padding: 0, fontWeight: 600, textDecoration: 'underline' }}
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default StudentLogin
