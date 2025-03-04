import { configureStore } from '@reduxjs/toolkit'
import playerSlice from './slices/playerSlice'

const store = configureStore({
  reducer: {
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['player.sound'],
        ignoredActions: ['player/newSong']
      },
    }),
})

export default store
