import { motion } from 'framer-motion'

interface AnimatedWrapperProps {
    children: ReactNode; 
    initial?: { opacity: number, y: number }; 
    animate?: { opacity: number, y: number }; 
    transition?: { duration: number }; 
}

const AnimatedWrapper = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 1 },
}: AnimatedWrapperProps): JSX.Element => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedWrapper
