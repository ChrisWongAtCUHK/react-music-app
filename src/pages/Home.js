import { AnimatePresence, motion } from 'framer-motion'

function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <main>
          {/* Introduction */}
          <section className='mb-8 py-20 text-white text-center relative'>
            <div
              className='absolute inset-0 w-full h-full bg-contain introduction-bg'
              style={{
                backgroundImage: 'url(assets/img/header.png)',
                zIndex: -999,
              }}
            ></div>
            <div className='container mx-auto'>
              <div className='text-white main-header-content'>
                <h1 className='font-bold text-5xl mb-5'>
                  Listen to Great Music!
                </h1>
                <p className='w-full md:w-8/12 mx-auto'>
                  Listen to music uploaded by users, Upload your favorite music
                  now and share them with others!
                </p>
              </div>
            </div>

            <img
              className='relative block mx-auto mt-5 -mb-20 w-auto max-w-full'
              src={`/assets/img/introduction-music.png`}
              alt='introduction'
            />
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
