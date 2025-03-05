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

  function updateSeek(event) {
    // Update status of the player-timeline-progress based on the player progress timeline selected by user
    if (!player.sound.playing) {
      return
    }

    const { x, width } = event.currentTarget.getBoundingClientRect()
    // Ex: if Document = 2000, Timeline = 1000 --> clientX = 1000, Distance = 500
    const clickX = event.clientX - x
    const percentage = clickX / width
    const seconds = player.sound.duration() * percentage

    player.sound.seek(seconds)
    player.sound.once('seek', this.progress) // pause the audio then change the current timeline then play again
  }

  useEffect(() => {
    if (player.sound.playing) {
      setPlaying(() => player.playing)

      player.sound.on('play', () => {
        requestAnimationFrame(process)
      })
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className='flex flex-nowrap gap-4 items-center'>
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
        {/* Scrub Container */}
        <div
          onClick={updateSeek}
          className='w-full h-2 rounded bg-gray-200 relative cursor-pointer'
        >
          {/* Player Ball */}
          <span
            className='absolute -top-2.5 -ml-2.5 text-gray-800 text-lg'
            style={{ left: playState.playerProgress }}
          >
            <i className='fas fa-circle'></i>
          </span>
          {/* Player Progress Bar */}
          <span
            className='block h-2 rounded bg-gradient-to-r from-green-500 to-green-400'
            style={{ width: playState.playerProgress }}
          ></span>
        </div>
        {/* Duration */}
        <div className='player-duration'>{playState.duration}</div>
      </div>
    </div>
  )
}

export default Player
