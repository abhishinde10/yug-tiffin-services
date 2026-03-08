function About() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">About Yug Tiffin Services</h1>
        <p className="page-subtitle">
          Home-style, hygienic, and affordable meals designed especially for students living away
          from home.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🍛</span>
            <h3>Home-Style Taste</h3>
            <p>
              Our meals are cooked with minimal oil and fresh ingredients so that they taste like
              food from home, not a restaurant.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🧼</span>
            <h3>Clean &amp; Safe</h3>
            <p>
              We follow strict hygiene standards in our kitchen and serving area to keep students
              safe and healthy.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Smart Mess Management</h3>
            <p>
              Digital records, online parcel booking, and dashboards make it easy for both students
              and admins to manage meals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

