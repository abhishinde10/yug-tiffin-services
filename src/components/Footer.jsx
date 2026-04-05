import { Link } from 'react-router-dom'
import { MapPin, Phone, MessageCircle } from 'lucide-react'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Column 1: Brand & About */}
        <div className="footer-column">
          <div className="logo-text" style={{ marginBottom: '1rem' }}>
            <h1 style={{ color: 'var(--primary-100)', fontSize: '1.5rem' }}>Yug Tiffin Services</h1>
            <p style={{ color: 'var(--primary-200)', opacity: 0.9 }}>Authentic Maharashtrian Meals</p>
          </div>
          <p className="footer-text">
            Providing hygienic, fresh, and student-friendly mess services with a taste that reminds you of home.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/pricing" className="footer-link">Monthly Plans</Link>
            <Link to="/contact" className="footer-link">Contact Support</Link>
            <Link to="/admin/login" className="footer-link" style={{ marginTop: '0.5rem', color: 'var(--primary-200)' }}>Admin Portal</Link>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-column">
          <h3 className="footer-title">Get In Touch</h3>
          <div className="footer-links" style={{ gap: '1rem' }}>
            <div className="footer-contact-item">
              <MapPin size={20} />
              <a
                href="https://maps.app.goo.gl/9xevzJiwbvojd36u6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Near KK Wagh Engineering College, Nashik
              </a>
            </div>
            <div className="footer-contact-item">
              <Phone size={20} />
              <span>+91 88881 65662</span>
            </div>
            <div className="footer-contact-item">
              <MessageCircle size={20} />
              <span>WhatsApp Available</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {year} Yug Tiffin Services. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

