import { createSlice } from '@reduxjs/toolkit'
import { Howl } from 'howler'

const initialState = {
  current_song: {},
  sound: {},
  playing: false,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    newSong: (state, action) => {
      // prevent multiple audio files play at the same time
      if (state.sound instanceof Howl) {
        state.sound.unload()
      }

      state.current_song = action.payload.song

      state.sound = new Howl({
        src: [action.payload.song.url],
        html5: true,
      })

      state.sound.play()
      state.playing = true

      return state
    },
    toggleAudio: (state) => {
      if (!state.sound.playing) {
        return state
      }
      if (state.sound.playing()) {
        state.playing = false
        state.sound.pause()
      } else {
        state.playing = true
        state.sound.play()
      }
      return state
    },
  },
})

export const selectPlayer = (state) => state.player

export const { newSong, toggleAudio } = playerSlice.actions

export default playerSlice.reducer
