import { AnimatePresence, motion } from 'framer-motion'

function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='container'
      >
        <main>Home</main>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
