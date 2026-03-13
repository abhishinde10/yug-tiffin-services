function Pricing() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Plans &amp; Pricing</h1>
        <p className="page-subtitle">
          Simple monthly plans designed for students with predictable budgets.
        </p>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3 className="plan-name">Basic Plan</h3>
            <div className="plan-price">
              ₹2500<span>/month</span>
            </div>
            <p className="plan-duration">Lunch Only</p>
            <ul className="plan-features">
              <li>Lunch (Mon–Sat)</li>
              <li>Fresh daily meals</li>
              <li>Standard rotating menu</li>
              <li>Digital billing</li>
            </ul>
            <button type="button" className="btn btn-primary">
              Join Now
            </button>
          </div>

          <div className="pricing-card featured">
            <span className="popular-badge">Most Popular</span>
            <h3 className="plan-name">Standard Plan</h3>
            <div className="plan-price">
              ₹3500<span>/month</span>
            </div>
            <p className="plan-duration">Lunch + Dinner</p>
            <ul className="plan-features">
              <li>Lunch &amp; Dinner (Mon–Sat)</li>
              <li>Premium menu options</li>
              <li>Digital billing &amp; receipts</li>
              <li>Parcel booking access</li>
            </ul>
            <button type="button" className="btn btn-secondary">
              Join Now
            </button>
          </div>

          <div className="pricing-card">
            <h3 className="plan-name">Premium Plan</h3>
            <div className="plan-price">
              ₹4000<span>/month</span>
            </div>
            <p className="plan-duration">Full Access</p>
            <ul className="plan-features">
              <li>All meals (7 days)</li>
              <li>Priority parcel booking</li>
              <li>Sunday meals included</li>
              <li>Detailed payment history</li>
            </ul>
            <button type="button" className="btn btn-primary">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

