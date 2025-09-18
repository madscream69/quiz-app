import {createSlice} from "@reduxjs/toolkit";

interface customQuestion  {
    theme: string,
    question: string,
    amountAnswers: null | number,
    correctAnswer: string,
    incorrectAnswers: string[]
}
const initialState:customQuestion = {
    theme: '',
    question: '',
    amountAnswers: null,
    correctAnswer: '',
    incorrectAnswers: [],
}
const questionSlice =  createSlice({
    name: 'createQuestion',
    initialState,
    reducers:{
        resetQuestion:(state)=>{
            state.theme= '';
            state.question= '';
            state.amountAnswers= null;
            state.correctAnswer= '';
            state.incorrectAnswers= [];
        },
        createQuestion:(state, action)=>{
            const {theme, question, amountAnswers, correctAnswer, incorrectAnswers} = action.payload;
            state.theme= theme;
            state.question= question;
            state.amountAnswers= amountAnswers;
            state.correctAnswer= correctAnswer;
            state.incorrectAnswers= incorrectAnswers;
        }

    }
})
export default questionSlice.reducer;
export const {resetQuestion, createQuestion} = questionSlice.actions;

//NUZHNO PROVERIT