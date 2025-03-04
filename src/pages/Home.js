import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { songsCollection } from '../includes/firebase'
import SongItem from '../components/SongItem'

function Home() {
  const maxPerPage = 25
  const [songs, setSongs] = useState([])
  const [pendingRequest, setPendingRequest] = useState(false)

  async function getSongs() {
    if (pendingRequest) {
      return
    }

    setPendingRequest(() => true)
    let snapshots

    if (songs.length) {
      // get last song to request songs after it and not from the beginning again
      const lastDoc = await songsCollection
        .doc(songs[songs.length - 1].docID)
        .get()

      snapshots = await songsCollection
        .orderBy('modified_name')
        .startAfter(lastDoc)
        .limit(maxPerPage)
        .get()
    } else {
      // request songs with a limit for infinite scrolling
      snapshots = await songsCollection
        .orderBy('modified_name')
        .limit(maxPerPage)
        .get()
    }

    // update local songs
    const s = [...songs]
    snapshots.forEach((document) => {
      s.push({
        docID: document.id,
        ...document.data(),
      })
    })
    setSongs(() => [...s])
    setPendingRequest(() => false)
  }

  useEffect(() => {
    ;(async () => {
      try {
        await getSongs()
      } catch (err) {
        console.error(err)
      }
    })()
  })

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

          {/* Main Content */}
          <section className='container mx-auto'>
            <div className='bg-white rounded border border-gray-200 relative flex flex-col'>
              <div className='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
                <span className='card-title'>Songs</span>
              </div>
              {/* Playlist */}
              <ol id='playlist'>
                {
                  songs.map((song) => <SongItem key={song.docID} song={song} />)
                }
              </ol>
              {/* .. end Playlist */}
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}

export default Home
