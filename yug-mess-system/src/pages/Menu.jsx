function Menu() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Today&apos;s Menu</h1>
        <p className="page-subtitle">
          Fresh, balanced, and student-friendly meals served for lunch and dinner.
        </p>

        <div className="menu-cards">
          <div className="menu-card">
            <div className="menu-header">
              <h3 className="menu-title">Lunch</h3>
              <span className="menu-time">12:00 PM – 2:00 PM</span>
            </div>
            <ul className="menu-items">
              <li className="menu-item">
                <span>4 Roti / Chapati</span>
              </li>
              <li className="menu-item">
                <span>Dal Tadka</span>
              </li>
              <li className="menu-item">
                <span>Steamed Rice</span>
              </li>
              <li className="menu-item">
                <span>Mix Veg Sabji</span>
              </li>
              <li className="menu-item">
                <span>Salad &amp; Pickle</span>
              </li>
            </ul>
          </div>

          <div className="menu-card">
            <div className="menu-header">
              <h3 className="menu-title">Dinner</h3>
              <span className="menu-time">7:00 PM – 9:00 PM</span>
            </div>
            <ul className="menu-items">
              <li className="menu-item">
                <span>4 Chapati</span>
              </li>
              <li className="menu-item">
                <span>Paneer Butter Masala</span>
              </li>
              <li className="menu-item">
                <span>Jeera Rice</span>
              </li>
              <li className="menu-item">
                <span>Dal Fry</span>
              </li>
              <li className="menu-item">
                <span>Papad &amp; Chutney</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu

