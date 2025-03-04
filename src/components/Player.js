import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlayer, toggleAudio } from '../features/slices/playerSlice'

function Player() {
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if(player.sound.playing) {
      setPlaying(() => player.playing)
    }
    return
  }, [player.playing, player.sound.playing])

  return (
    <div className='fixed bottom-0 left-0 bg-white px-4 py-4 w-full player-container'>
      {/* Track Info */}
      {player.current_song.modified_name ? (
        <div className='text-center' v-if='current_song.modified_name'>
          <span className='song-title font-bold'>
            {player.current_song.modified_name}
          </span>
          &nbsp;by&nbsp;
          <span className='song-artist'>
            {player.current_song.display_name}
          </span>
        </div>
      ) : null}
       {/* Play/Pause Button */}
       <button type="button" onClick={() => dispatch(toggleAudio())}>
        <i
          className={['fa', 'text-gray-500', 'text-xl', playing ? '' : 'fa-play', playing ? 'fa-pause' : ''].join(' ')}
        ></i>
      </button>
    </div>
  )
}

export default Player
