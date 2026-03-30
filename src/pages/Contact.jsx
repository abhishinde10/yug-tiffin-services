function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    // For now just show a friendly message – can be replaced with real API call later
    alert('Thank you for contacting Yug Tiffin Services!')
    event.target.reset()
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Reach out for membership, parcel booking, or general questions. We are happy to help.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
                <p>+91 98765 43211</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Address</h3>
                <p>College Road, Near University Gate</p>
                <p>Nashik, Maharashtra 422005</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>info@yugtiffin.com</p>
                <p>support@yugtiffin.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="form-input"
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  required
                  placeholder="Write your message here..."
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

