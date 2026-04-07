import MotionSection from '../components/MotionSection.jsx'
import AnimatedCard from '../components/AnimatedCard.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Today's Special Meals */}
      <MotionSection className="page-section bg-cream">
        <div className="pattern-overlay"></div>
        <div className="section-header relative z-10">
          <p className="section-label">Fresh & Delicious</p>
          <h2 className="section-title">Special Meals</h2>
          <p className="section-subtitle">Prepared with love, just like home.</p>
        </div>

        <div className="features-grid relative z-10">
          <AnimatedCard className="feature-card menu-card-special">
            <img src="https://madhurasrecipe.com/wp-content/uploads/2022/03/chicken_thali_featured.jpg" alt="Maharashtrian Chicken Thali" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>Sunday Special Chicken Thali</h3>
              <span className="badge badge-warning" style={{ fontSize: '1rem', padding: '0.4rem 0.8rem' }}>₹150</span>
            </div>
            <p>Authentic taste featuring Chicken Curry, Rice, 4 Chapatis, Salad and Pickle.</p>
          </AnimatedCard>

          <AnimatedCard className="feature-card menu-card-special">
            <img src="https://img.freepik.com/premium-photo/healthy-plate-lunch-containing-dal-brown-rice-methi-thepla-sabji-closeup-shot-healthy-food-plate-containing-dal-brown-rice-methi-thepla-sabji_1036975-240397.jpg?w=996" alt="Chapati & Sabji" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>Chapati + Sabji + Rice</h3>
              <span className="badge badge-warning" style={{ fontSize: '1rem', padding: '0.4rem 0.8rem' }}>₹100</span>
            </div>
            <p>Perfect meal with 4 hot Chapatis, Rice and a generous portion of seasonal Sabji's.</p>
          </AnimatedCard>

          <AnimatedCard className="feature-card menu-card-special">
            <img src="https://tse1.mm.bing.net/th/id/OIP.ZULL8PnsGKTAa9ymPZjPDAHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Dal Rice Salad" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>Chapati/Roti</h3>
              <span className="badge badge-warning" style={{ fontSize: '1rem', padding: '0.4rem 0.8rem' }}>₹15</span>
            </div>
            <p>Comfort food at its best. Hot Chapati's made from whole wheat flour.</p>
          </AnimatedCard>
        </div>
      </MotionSection>

      <div className="section-divider"></div>

      {/* Why choose us */}
      <MotionSection className="page-section bg-beige">
        <div className="section-header">
          <p className="section-label">Quality First</p>
          <h2 className="section-title">Why Customers Choose Yug Tiffin</h2>
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
              Student-friendly pricing with flexible monthly plans starting from just ₹1800. Choose
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
              Punctual meal every single day. We understand your schedule and ensure your
              food will be served when you need it, never late.
            </p>
          </AnimatedCard>
        </div>
      </MotionSection>

      <div className="section-divider" style={{ transform: 'rotate(180deg)' }}></div>

      {/* Trusted By Students - Testimonials */}
      <MotionSection className="page-section bg-cream" style={{ paddingBottom: '8rem', background: 'linear-gradient(to bottom, var(--bg-light), #F5EAD9)' }}>
        <div className="pattern-overlay"></div>
        <div className="section-header relative z-10">
          <p className="section-label">Our Community</p>
          <h2 className="section-title">Trusted by Students</h2>
          <p className="section-subtitle">Hear what our regular members have to say about our food.</p>
        </div>

        <div className="features-grid relative z-10" style={{ maxWidth: '1000px' }}>
          <AnimatedCard className="feature-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '1rem', fontSize: '1.2rem' }}>
              ★ ★ ★ ★ ★
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              "The taste is exactly like home. Being an outstation student, Yug Tiffin has been a lifesaver. Highly recommend their Maharashtrian Thali!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-dark)' }}>R</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Abhishek P Shinde</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>K K Wagh Student</span>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="feature-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '1rem', fontSize: '1.2rem' }}>
              ★ ★ ★ ★ ★
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              "Very hygienic and always on time. I've tried many mess services near the college, but this one is by far the most consistent in quality."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary-dark)' }}>S</div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Rohan V Gaikwad</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>MET Bhujabal Student</span>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </MotionSection>

    </>
  )
}

export default Home
