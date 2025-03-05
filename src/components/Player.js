import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlayer, toggleAudio } from '../features/slices/playerSlice'

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0
  const seconds = Math.round(time - minutes * 60 || 0)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function Player() {
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer)
  const [playing, setPlaying] = useState(false)
  const [playState, setPlayState] = useState({
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  })

  function process() {
    setPlayState((pre) => {
      return {
        ...pre,
        seek: formatTime(player.sound.seek()),
        duration: formatTime(player.sound.duration()),
        playerProgress: `${
          (player.sound.seek() / player.sound.duration()) * 100
        }%`,
      }
    })

    if (player.sound.playing()) {
      requestAnimationFrame(process)
    }
  }

  useEffect(() => {
    if (player.sound.playing) {
      setPlaying(() => player.playing)

      player.sound.on('play', () => {
        requestAnimationFrame(process)
      })
    }

    return
  }, [player.playing, player.sound, player.sound.playing])

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
      <button type='button' onClick={() => dispatch(toggleAudio())}>
        <i
          className={[
            'fa',
            'text-gray-500',
            'text-xl',
            playing ? '' : 'fa-play',
            playing ? 'fa-pause' : '',
          ].join(' ')}
        ></i>
      </button>
      {/* Current Position */}
      <div className='player-current-time'>{playState.seek}</div>
    </div>
  )
}

export default Player
