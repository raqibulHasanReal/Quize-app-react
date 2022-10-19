import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './reducers/questionReducer';
import authReducer from "./reducers/authReducer";
import answerReducer from "./reducers/answerReducer";

export const store = configureStore({
    reducer: {
        question: questionReducer,
        auth: authReducer,
        answer: answerReducer
    },
});