import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Howl } from 'howler'

const initialState = {
  current_song: {},
  sound: {},
  seek: '00:00',
  duration: '00:00',
  playerProgress: '0%',
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    newSong: (state, action) => {
      // prevent multiple audio files play at the same time
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }

      state.current_song = action.payload.song;

      state.sound = new Howl({
        src: [action.payload.song.url],
        html5: true,
      });

      state.sound.play()

      return state
    }
  },
})

export const selectPlayer = (state) => state.player

export const { newSong } = playerSlice.actions

export default playerSlice.reducer