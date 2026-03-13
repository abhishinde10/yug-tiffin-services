import { motion } from 'framer-motion'

function AnimatedCard({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--shadow-xl)' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard

