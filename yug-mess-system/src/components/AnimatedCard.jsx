import { motion } from 'framer-motion'

function AnimatedCard({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4, boxShadow: '0 18px 45px rgba(15,23,42,0.18)' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard

