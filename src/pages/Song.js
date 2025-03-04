import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { songsCollection } from '../includes/firebase'
import { newSong } from '../features/slices/playerSlice'

function Song() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [song, setSong] = useState({})
  const [sortedComments, setSortedComments] = useState([])

  function playSong() {
    dispatch(newSong({song}))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const docSnapshot = await songsCollection.doc(id).get(); // make request to get the song document
        setSong(() => docSnapshot.data())
      } catch (err) {
        console.error(err)
      }
    })()
  }, [id])

  useEffect(() => {
    console.log(song)
  }, [song])

  return (
    <main>
      {/* Music Header */}
      <section className='w-full mb-8 py-14 text-center text-white relative'>
        <div
          className='absolute inset-0 w-full h-full box-border bg-contain music-bg'
          style={{
            backgroundImage: 'url(/assets/img/song-header.png)',
            zIndex: -999,
          }}
        ></div>
        <div className='container mx-auto flex items-center'>
          {/* Play/Pause Button */}
          <button
            onClick={playSong}
            type='button'
            className='z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none'
          >
            <i className='fas fa-play'></i>
          </button>
          <div className='z-50 text-left ml-8'>
            {/* Song Info */}
            <div className='text-3xl font-bold'>{song.modified_name}</div>
            <div>{song.genre}</div>
          </div>
        </div>
      </section>

      {/* Comments */}
      <ul className='container mx-auto'>
        {sortedComments.map((comment) => (
          <li
            className='p-6 bg-gray-50 border border-gray-200'
            key={comment.docID}
          >
            {/* Comment Author */}
            <div className='mb-5'>
              <div className='font-bold'>{comment.name}</div>
              <time>{comment.datePosted}</time>
            </div>

            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Song
