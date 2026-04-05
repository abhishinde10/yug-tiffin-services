import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/contact/feedback", {
        name: formData.name,
        mobile: formData.mobile,
        message: formData.message
      });

      console.log(res.data);

      alert("Feedback submitted successfully");

      setFormData({
        name: "",
        mobile: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      alert("Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-page-section">
      <div className="contact-page-container">
        
        {/* Header section */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-tagline">"आपल्या सेवेसाठी आम्ही सदैव तयार"</p>
        </motion.div>

        {/* Form and Map grid layout */}
        <div className="contact-grid">
          
          {/* Left Column: Info & Map */}
          <motion.div 
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-text">
                  <h3>Call Us</h3>
                  <a href="tel:+918888165662">+91 88881 65662</a>
                  <a href="tel:+919168755434">+91 91687 55434</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-text">
                  <h3>Email</h3>
                  <a href="mailto:dbhalerao336@gmail.com">dbhalerao336@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-text">
                  <h3>Address</h3>
                  <p>Kiran Apartment, Gala No. 7, Amrutdham, Panchavati, Nashik</p>
                </div>
              </div>
            </div>

            <div className="map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14995.122394336214!2d73.81600329999999!3d20.017770850000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebb1c58ce27f%3A0xcfabcbf1ba2b1238!2sAmrutdham%2C%20Panchavati%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
            </div>
          </motion.div>

          {/* Right Column: Feedback Form */}
          <motion.div 
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="feedback-form">
              <h2>Send us a Message</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loader" style={{ marginRight: '10px', width: '18px', height: '18px' }}></span> Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
