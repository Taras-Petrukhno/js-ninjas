import { configureStore } from '@reduxjs/toolkit'
import superhero from './reducers/superheroSlice'

const store = configureStore({
  reducer: {
    superhero
  }
})

export default store