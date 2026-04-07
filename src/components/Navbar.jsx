import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import logo from "../assets/images/YUG_logo.png"

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
        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img
            src={logo}
            alt="Yug Tiffin Services Logo"
            className="navbar-logo"
          />
        </div>

        <a
          href="https://maps.app.goo.gl/AqBEp3Pm581XZbqE6"
          target="_blank"
          rel="noopener noreferrer"
          className="location-box"
        >
          <span className="location-icon">📍</span>
          <div>
            <p className="location-small">Visit Us</p>
            <p className="location-bold">Yug Tiffin Service</p>
          </div>
        </a>

        <ul className={`nav-menu ${isOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.to} className={item.label === 'Contact' ? 'nav-item-contact' : ''}>
              {item.label === 'Contact' ? (
                <div className="contact-dropdown-wrapper">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                  <div className="contact-dropdown-menu">
                    <div className="contact-drop-item">
                      <span className="drop-icon">📞</span>
                      <div className="drop-text">
                        <a href="tel:+918888165662">+91 88881 65662</a>
                        <br />
                        <a href="tel:+919168755434">+91 91687 55434</a>
                      </div>
                    </div>
                    <div className="contact-drop-item">
                      <span className="drop-icon">📍</span>
                      <div className="drop-text">
                        <a href="https://maps.app.goo.gl/dfFs7m4xw6DwTBZq9" target="_blank" rel="noopener noreferrer">
                          Kiran Apartment, Gala No. 7,<br />Amrutdham, Panchavati,<br />Nashik
                        </a>
                      </div>
                    </div>
                    <div className="contact-drop-item">
                      <span className="drop-icon">📧</span>
                      <div className="drop-text">
                        <a href="mailto:dbhalerao336@gmail.com">dbhalerao336@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              )}
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