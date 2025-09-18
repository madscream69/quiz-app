
import {type QuizState, type Category } from '../types';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: QuizState = {
    theme: '',
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isLoading: false,
    token: '',
    categories: null,
    error: null,
};

// Thunk для токена
export const fetchToken = createAsyncThunk('quiz/fetchToken', async () => {
    const res = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await res.json();
    return data.token;
});

// Thunk для категорий
export const fetchCategories = createAsyncThunk('quiz/fetchCategories', async () => {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    return data.trivia_categories as Category[];
});

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        selectAnswer: (state, action) => {
            const { questionId, optionIndex } = action.payload;
            state.answers[questionId] = optionIndex;
            if (optionIndex === state.questions[state.currentQuestionIndex]?.correct) {
                state.score++;
            }
            state.currentQuestionIndex++;
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.answers = {};
            state.score = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Token
            .addCase(fetchToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
            })
            .addCase(fetchToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch token';
            })
            // Categories
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });
    },
});

export const { selectAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;