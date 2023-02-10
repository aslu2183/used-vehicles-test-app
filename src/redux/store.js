import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducer/filterReducer'

const store = configureStore({
    reducer : {
        filter : filterReducer
    }
})

export default store