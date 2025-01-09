import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './exempleSlice'

export default configureStore({
  reducer: {
    counter:exampleReducer,
  },
})