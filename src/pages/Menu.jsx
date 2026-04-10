import { useState, useEffect } from 'react'
import axios from 'axios'

function Menu() {
  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodayMenu = async () => {
      try {
        const { data } = await axios.get('https://yug-backend-3v83.onrender.com/api/menu/today')
        setMenu(data)
      } catch (error) {
        console.error('Error fetching today menu:', error)
        setMenu(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTodayMenu()
  }, [])

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-title">Today&apos;s Menu</h1>
        <p className="page-subtitle">
          Fresh, balanced, and student-friendly meals served for lunch and dinner.
        </p>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0' }}>
            <div style={{ border: '4px solid rgba(0,0,0,0.1)', borderLeftColor: 'var(--primary-dark)', borderRadius: '50%', width: '3rem', height: '3rem', animation: 'spin 1s linear infinite' }}></div>
            <span style={{ marginLeft: '1rem', fontSize: '1.2rem', color: 'var(--text-light)' }}>Loading menu...</span>
          </div>
        ) : menu ? (
          <div className="menu-cards">
            <div className="menu-card">
              <div className="menu-header">
                <h3 className="menu-title">Lunch</h3>
                <span className="menu-time">12:00 PM – 2:00 PM</span>
              </div>
              <ul className="menu-items">
                {menu.lunchItems && menu.lunchItems.length > 0 ? (
                  menu.lunchItems.map((item, index) => (
                    <li key={index} className="menu-item">
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="menu-item" style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                    <span>No lunch items available</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="menu-card">
              <div className="menu-header">
                <h3 className="menu-title">Dinner</h3>
                <span className="menu-time">7:00 PM – 9:00 PM</span>
              </div>
              <ul className="menu-items">
                {menu.dinnerItems && menu.dinnerItems.length > 0 ? (
                  menu.dinnerItems.map((item, index) => (
                    <li key={index} className="menu-item">
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="menu-item" style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                    <span>No dinner items available</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8f9fa', borderRadius: '1rem', border: '1px dashed #dee2e6' }}>
             <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🍽️</span>
             <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>Menu Not Available Yet</h3>
             <p style={{ margin: 0, color: 'var(--text-light)' }}>Please check back later or contact us directly.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Menu

