import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "./store.ts";
interface Question{
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[];
    question: string,
    type: string

}
export interface QuestionsState {
    loading: boolean;
    error: string | null;
    response_code: number | null;
    results: Question[];
    currentCategoryId: string | null; // Новое поле
}
const initialState:QuestionsState = {
    loading: false,
    error: null,
    response_code: null,
    results: [],
    currentCategoryId: null,
}

export const fetchQuestionData = createAsyncThunk('questions/fetchQuestions', async (categoryId: string, {getState,rejectWithValue})=>{
    const state = getState() as RootState;
    // Проверяем, есть ли данные для текущего categoryId
    if (state.questions.currentCategoryId === categoryId && state.questions.results.length > 0) {
        return { results: state.questions.results, categoryId }; // Возвращаем существующие данные
    }
    try {
        const res = await fetch(
            `https://opentdb.com/api.php?amount=10&type=multiple&category=${categoryId}`
        );
        const data = await res.json();
        if (data.response_code !== 0) {
            return rejectWithValue(`API error: response_code ${data.response_code}`);
        }
        return { results: data.results, categoryId };
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch questions');
    }
})
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        resetQuestions: (state) => {
            state.results = [];
            state.response_code = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers:  (builder)=>{
        builder.
            addCase(fetchQuestionData.pending, (state)=>{
                state.loading = true;
                state.error = null;
            }).
            addCase(fetchQuestionData.fulfilled, (state, action)=>{
                state.loading = false;
                state.response_code = action.payload.results ? 0 : null;
                state.results = action.payload.results || [];
                state.currentCategoryId = action.payload.categoryId;
            }).
            addCase(fetchQuestionData.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch questions';
                state.results = [];
                state.currentCategoryId = null;
            })
    }

})
export const { resetQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;