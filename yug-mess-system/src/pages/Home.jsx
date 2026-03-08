import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MotionSection from '../components/MotionSection.jsx'
import AnimatedCard from '../components/AnimatedCard.jsx'

function Home() {
  const navigate = useNavigate()

  const goToMenu = () => navigate('/menu')
  const goToPricing = () => navigate('/pricing')

  return (
    <>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-gradient" />
        <div className="hero-container">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">
              <span>Affordable</span> & Hygienic
              <br />
              Home-Style Meals for Students
            </h1>
            <p className="hero-subtitle">Fresh • Nutritious • On Time</p>

            <div className="hero-features">
              <div className="hero-feature">Fresh Daily</div>
              <div className="hero-feature">Hygienic</div>
              <div className="hero-feature">Affordable</div>
            </div>

            <div className="hero-buttons">
              <button type="button" className="btn btn-primary" onClick={goToMenu}>
                🍽️ View Today&apos;s Menu
              </button>
              <button type="button" className="btn btn-secondary" onClick={goToPricing}>
                Join Membership
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              className="hero-main-img"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop"
              alt="Delicious Indian thali"
            />
            <div className="floating-badge badge-1">
              <strong>500+</strong>
              <span>Happy Students</span>
            </div>
            <div className="floating-badge badge-2">
              <strong>4.8★</strong>
              <span>Average Rating</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
      <MotionSection className="page-section">
        <div className="section-header">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Why Students Choose Yug Tiffin</h2>
        </div>

        <div className="features-grid">
          <AnimatedCard className="feature-card">
            <span className="feature-icon">👨‍🍳</span>
            <h3>Freshly Cooked Daily</h3>
            <p>
              Every meal is prepared fresh in our kitchen each day using the finest ingredients. No
              reheated or preserved food – just wholesome, home-style cooking.
            </p>
          </AnimatedCard>

          <AnimatedCard className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Affordable Monthly Plans</h3>
            <p>
              Student-friendly pricing with flexible monthly plans starting from just ₹2500. Choose
              from lunch-only, dinner-only, or full-day meal options.
            </p>
          </AnimatedCard>

          <AnimatedCard className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>Clean &amp; Hygienic Kitchen</h3>
            <p>
              We maintain the highest standards of cleanliness and hygiene. Our kitchen is regularly
              sanitized and follows strict food safety protocols.
            </p>
          </AnimatedCard>

          <AnimatedCard className="feature-card">
            <span className="feature-icon">⏰</span>
            <h3>On-Time Meal Service</h3>
            <p>
              Punctual meal delivery every single day. We understand your schedule and ensure your
              food arrives when you need it, never late.
            </p>
          </AnimatedCard>
        </div>
      </MotionSection>
    </>
  )
}

export default Home
