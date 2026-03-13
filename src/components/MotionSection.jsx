import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function MotionSection({ children, delay = 0, as = 'section', className = '', ...rest }) {
  const Tag = motion[as] || motion.section

  return (
    <Tag
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default MotionSection

