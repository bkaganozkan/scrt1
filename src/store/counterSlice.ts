import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
    name: 'quests',
    initialState: {
        questions: [] as any,
        currentQuestionIndex: 0,
        fetchQuestions: false,
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.fetchQuestions = true;
        },
        increment: (state, action: any) => {
            state.questions[state.currentQuestionIndex] = { ...state.questions[state.currentQuestionIndex], userAnswer: action.payload as string }
            state.currentQuestionIndex += 1
        },
        decrement: (state) => {
            state.currentQuestionIndex -= 1
        },
    },
})

export const { increment, decrement, setQuestions } = counterSlice.actions

export default counterSlice.reducer