import { motion } from 'motion/react'

type Props = {
  active: boolean
  className?: string
}

const CollapsibleX: React.FC<Props> = ({ active, className }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path
        variants={{
          collapsed: { rotate: 45, translateX: -5 },
          normal: { rotate: 0, translateX: 0 },
        }}
        initial="collapsed"
        animate={active ? 'normal' : 'collapsed'}
        d="M22.5 21.0889C22.8905 21.4794 22.8905 22.1124 22.5 22.5029C22.1095 22.8934 21.4764 22.8934 21.0859 22.5029L1.49997 2.91602C1.1095 2.52553 1.10951 1.89245 1.49998 1.50197C1.89047 1.11148 2.52358 1.11149 2.91406 1.50199L22.5 21.0889Z"
        fill="black"
      />
      <motion.path
        variants={{
          collapsed: { rotate: -45, translateX: 5 },
          normal: { rotate: 0, translateX: 0 },
        }}
        initial="collapsed"
        animate={active ? 'normal' : 'collapsed'}
        d="M22.5 2.91504C22.8905 2.52455 22.8905 1.89147 22.5 1.50099C22.1095 1.1105 21.4764 1.11051 21.0859 1.50101L1.49997 21.0879C1.1095 21.4784 1.10951 22.1115 1.49998 22.5019C1.89047 22.8924 2.52358 22.8924 2.91406 22.5019L22.5 2.91504Z"
        fill="black"
      />
    </svg>
  )
}

export default CollapsibleX
