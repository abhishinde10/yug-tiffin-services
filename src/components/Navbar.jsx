import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Daily Menu' },
  { to: '/pricing', label: 'Plans' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleStudentLogin = () => {
    setIsOpen(false)
    navigate('/student/login')
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          
          <div className="logo-icon">
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🍱</span>
          </div>

          <div className="logo-text">
            <h1>Yug Tiffin Services</h1>
            <p>Smart Mess Management</p>
          </div>

        </Link>

        <ul className={`nav-menu ${isOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <motion.button 
              className="btn btn-primary" 
              onClick={handleStudentLogin} 
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Student Login
            </motion.button>
          </li>
        </ul>

        <div 
          className="hamburger" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar