import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import kakaImg from '../assets/images/Kaka_Img1.jpeg';
import kakaImg2 from '../assets/images/Kaka_Img2.jpeg';
import member1Img from '../assets/images/Member1.png';
import member2Img from '../assets/images/Member2.png';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function About() {
  return (
    <section className="about-page">
      {/* 1. Header Section */}
      <motion.div
        className="about-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
      >
        <span className="about-legacy-text">Our Legacy</span>
        <h1 className="about-main-heading">About Yug Tiffin Services</h1>
        <p className="about-tagline">"घरगुती चवीचा विश्वास"</p>
      </motion.div>

      {/* 2. Main Content Layout (2 Column Responsive) */}
      <div className="about-content-container">
        <motion.div
          className="about-image-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
        >
          <img src={kakaImg} alt="Yug Tiffin Services Journey" className="about-main-img" />
        </motion.div>

        <motion.div
          className="about-text-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeIn}>
            At <strong>Yug Tiffin Services</strong>, we bring the warmth and comfort of home-cooked meals into your everyday life. Rooted in traditional Maharashtrian values and inspired by a long-standing legacy of service from our respected elders, we began our journey in 2012. For over 14 years, our mission has remained simple — to provide fresh, hygienic, and affordable meals with complete reliability.
          </motion.p>
          <motion.p variants={fadeIn}>
            We understand how much people miss the taste of homemade food. That is why every tiffin prepared in our kitchen is made with care, using high-quality, fresh ingredients, ensuring each meal feels just like home.
          </motion.p>
          <motion.p variants={fadeIn}>
            With strong dedication, consistent quality, and the trust of our customers, we continue to serve with commitment so you never have to compromise on your health or the authentic flavors you love.
          </motion.p>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div
        className="about-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* 3. Legacy / Inspiration Section (Main Highlight) */}
      <motion.div
        className="about-inspiration-section"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inspiration-content">
          <h2 className="inspiration-title2">Our Inspiration</h2>
          <div className="inspiration-image-wrapper">
            <img src={kakaImg2} alt="Our Inspiration" />
          </div>
          <h2 className="inspiration-title">आदरणीय भागीरथी दामूअण्णा राजगुरू</h2>
          <p className="inspiration-subtitle">The Heart Behind Yug Tiffin Services</p>
          <blockquote className="inspiration-quote">"ज्यांच्या हातच्या चवीतून या प्रवासाची सुरुवात झाली"</blockquote>
          <p className="inspiration-desc">
            This journey began with the love, care, and homemade taste of our beloved mother.
            Her dedication to serving fresh and heartfelt meals laid the foundation of Yug Tiffin Services.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="about-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* 4. Current Team Section */}
      <div className="about-team-section">
        <motion.div
          className="team-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <h2 className="team-title">Meet Our Leadership</h2>
          <p className="team-subtitle">Committed to Quality & Tradition</p>
        </motion.div>

        <motion.div
          className="team-cards-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[

            { id: 1, role: "Owner", image: member1Img, name: "Dnyaneshwar Bhalerao", desc: "Leading Yug Tiffin Service with a vision of delivering quality, hygiene, and trust. Committed to maintaining excellence in every meal served." },
            { id: 2, role: "Operational Head", image: member2Img, name: "Rohini D Bhalerao", desc: "Overseeing daily operations to ensure smooth service and customer satisfaction. Dedicated to upholding consistency and quality in every aspect." }

          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              variants={fadeIn}
              whileHover={{
                y: -10,
                boxShadow: "0 15px 35px rgba(255,122,0,0.15)"
              }}
            >
              <div className="team-card-img-wrapper">
                <img src={member.image} alt={member.name} />
              </div>
              <h3 className="team-card-name">{member.name}</h3>
              <p className="team-card-role">
                {member.role} <span className="year">(2012–Present)</span>
              </p>
              <p className="team-card-desc">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
