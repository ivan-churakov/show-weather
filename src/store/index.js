import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/slices/counterSlice.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})