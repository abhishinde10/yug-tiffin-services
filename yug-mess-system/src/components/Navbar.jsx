import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Menu as MenuIcon, UserRound } from 'lucide-react'

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
            <LayoutDashboard size={18} />
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
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="btn-student-login"
              onClick={handleStudentLogin}
            >
              <UserRound size={16} />
              <span>Student Login</span>
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="hamburger"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <MenuIcon size={22} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar

