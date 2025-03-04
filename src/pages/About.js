import { AnimatePresence, motion } from 'framer-motion'

function About() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <section className='py-24 text-white text-center relative'>
          <div
            className='absolute inset-0 w-full h-[87vh] introduction-bg bg-cover'
            style={{
              backgroundImage: 'url(assets/img/song-header.png)',
              zIndex: -999,
            }}
          ></div>
          <div className='container mx-auto p-40'>
            <div className='text-white main-header-content'>
              <h1 className='font-bold text-5xl mb-5 z-1'>
                Music app created with{' '}
                <span className='text-green-400'>React</span>
              </h1>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  )
}

export default About
