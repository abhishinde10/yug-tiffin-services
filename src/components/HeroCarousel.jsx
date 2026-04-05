import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import messBanner from '../assets/images/Mess_Banner.jpg'
import crowdPhoto from '../assets/images/crowd_photo.png';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    image: messBanner,
    title: 'Healthy & Affordable <br/> Mess Food',
    subtitle: 'Daily fresh meals for students, just like home',
  },
  {
    id: 2,
    image: 'https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-36317.jpg?w=2000',
    title: 'Authentic Maharashtrian <br/> Thali',
    subtitle: 'Taste the real flavors of Maharashtra every day',
  },
  {

    id: 3,
    image: crowdPhoto,
    title: 'Clean & Hygienic <br/> Environment',
    subtitle: 'Prepared in a sanitized kitchen with strict food safety',
  }
];

function HeroCarousel() {
  const navigate = useNavigate();

  return (
    <section className="hero-carousel-section" id="home">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="carousel-slide">
                <div className="carousel-image-wrapper">
                  <div className="carousel-overlay"></div>
                  <img src={slide.image} alt="Mess food" className="carousel-bg" />
                </div>

                <div className="carousel-content">
                  <div className="hero-container hero-carousel-container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="carousel-text-area">
                      <motion.h1
                        className="hero-title text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />

                      <motion.p
                        className="hero-subtitle text-white-70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {slide.subtitle}
                      </motion.p>

                      <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <motion.button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => navigate('/menu')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          🍽️ View Today's Menu
                        </motion.button>
                        <motion.button
                          type="button"
                          className="btn carousel-btn-outline"
                          onClick={() => navigate('/pricing')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Join Membership
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;
