import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface NewsModalProps {
  onClick: () => void
  children: React.ReactNode
}

export const NewsModal = ({ onClick, children }: NewsModalProps) => {
  useEffect(() => {
    document.body.classList.add('locked')
    return () => document.body.classList.remove('locked')
  }, [])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-999 bg-[rgba(50,50,50,0.2)] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>,
    // @ts-expect-error ...
    document.getElementById('__portals'),
  )
}
