import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="logo-text">
            <h1>Yug Tiffin Services</h1>
            <p>Affordable home-style meals for students</p>
          </div>
          <p className="footer-text">
            Providing hygienic, fresh, and student-friendly tiffin services with
            smart digital management.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/pricing" className="footer-link">
            Pricing
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/admin/login" className="footer-link">
            Admin Login
          </Link>
        </div>

        <p className="footer-text">© {year} Yug Tiffin Services. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

