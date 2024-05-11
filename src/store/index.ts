import { configureStore } from '@reduxjs/toolkit'
import counterReduce from './counterSlice.ts'

export default configureStore({
    reducer: {
        quests: counterReduce,
    },
})