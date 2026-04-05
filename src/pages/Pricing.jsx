function Pricing() {
  const handleWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/918888165662?text=${encodedMessage}`;
    console.log("Redirecting to WhatsApp:", message);
    window.open(url, "_blank");
  };

  return (
    <section className="pricing-section">
      <div className="page-container">

        <div className="pricing-header">
          <p className="section-label">Mess Plans</p>
          <h1 className="pricing-main-title">Simple & Affordable Plans</h1>
          <p className="pricing-main-subtitle">
            Home-style meals at student-friendly prices. Choose a plan that fits your schedule.
          </p>
        </div>

        <div className="pricing-grid">

          {/* PLAN 2 - Basic */}
          <div className="pricing-card">
            <h3 className="plan-name">Basic Plan</h3>
            <div className="plan-price">
              ₹1800<span>/month</span>
            </div>
            <p className="plan-duration">One Time Meal (30 Meals)</p>
            <ul className="plan-features">
              <li>30 meals per month</li>
              <li>Lunch or Dinner option</li>
              <li>Simple and healthy food</li>
              <li>Budget-friendly plan</li>
            </ul>
            <button 
              type="button" 
              className="plan-btn"
              onClick={() => handleWhatsApp("Hello, I am interested in Basic Plan (₹1800/month - 30 meals). Please share details.")}
            >
              Join Plan
            </button>
          </div>

          {/* PLAN 1 - Regular (Most Popular / Featured) */}
          <div className="pricing-card featured">
            <span className="popular-badge">⭐ MOST POPULAR</span>
            <h3 className="plan-name">Regular Plan</h3>
            <div className="plan-price">
              ₹3000<span>/month</span>
            </div>
            <p className="plan-duration">Lunch + Dinner (Mon–Sun)</p>
            <ul className="plan-features">
              <li>Two time home-style meals</li>
              <li>Fresh and hygienic food</li>
              <li>Balanced daily menu</li>
              <li>Affordable monthly pricing</li>
            </ul>
            <button 
              type="button" 
              className="plan-btn plan-btn-featured"
              onClick={() => handleWhatsApp("Hello, I am interested in Regular Plan (₹3000/month - Lunch + Dinner). Please share details.")}
            >
              Join Plan
            </button>
          </div>

          {/* PLAN 3 - Single Meal */}
          <div className="pricing-card">
            <h3 className="plan-name">Single Meal Option</h3>
            <div className="plan-price">
              ₹15<span> / roti</span>
            </div>
            <p className="plan-duration">Flexible Add-on</p>
            <ul className="plan-features">
              <li>Single chapati / roti pricing</li>
              <li>Add extra as needed</li>
              <li>Freshly made daily</li>
              <li>Pay per item</li>
            </ul>
            <button 
              type="button" 
              className="plan-btn"
              onClick={() => handleWhatsApp("Hello, I am interested in Single Meal Option (₹15/roti). Please share details.")}
            >
              Join Plan
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Pricing
