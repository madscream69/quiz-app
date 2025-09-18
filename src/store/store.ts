import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import questionsSlice from "./questionsSlice.ts";

const store = configureStore({
    reducer: { quiz: quizReducer, questions: questionsSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;