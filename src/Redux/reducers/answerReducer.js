import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {quizDatabase} from "../../App";

const fetchAnswer = async () => {
    if(!!localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        return quizDatabase.answer.where({ userId: user.id }).toArray();
    } else {
        return [];
    }
}

const fetchAllAnswerHistory = async (questionId) => {
   return quizDatabase.answerHistory.where({questionId: parseInt(questionId)}).toArray();
}

const getAnswerByQuestionAndUserId = async (quesID, userId) => {
    return quizDatabase.answer.where({questionId: parseInt(quesID), userId: parseInt(userId)}).first();
}

const initialState = {
    answer:  [],
    history: []
};

export const submitAnswer = createAsyncThunk(
    'answer/store',
    async (data, { rejectWithValue }) => {
        const {answer, answerHistory} = data;
        return quizDatabase.answer.add(answer).then( async () => {
            const submittedAnswer = await getAnswerByQuestionAndUserId(answer.questionId, answer.userId)
            answerHistory.answerId = submittedAnswer.id;
            return  quizDatabase.answerHistory.add(answerHistory).then(async ()=> {
                return  fetchAnswer();
            })
        })
    }
);

export const updateAnswer = createAsyncThunk(
    'answer/update',
    async (data, { rejectWithValue }) => {
        const {answer, answerHistory} = data;
        return quizDatabase.answer.update(answer.previousId, answer).then( async () => {
            return quizDatabase.answerHistory.update(answerHistory.historyId, answerHistory).then(async ()=> {
                return  fetchAnswer();
            })
        })
    }
);

export const setAnswer = createAsyncThunk(
    'answer/set',
    async (answer, { rejectWithValue }) => {
        try {
            return await fetchAnswer().then( (res)=> res );
        } catch (e) {
            console.log(e)
        }
    }
);

export const answerHistory = createAsyncThunk(
    'answer/history',
    async (questionId, { rejectWithValue }) => {
        try {
            return fetchAllAnswerHistory(questionId)
        } catch (e) {
            console.log(e.message)
            return e.message()
        }
    }
);

export const answerReducer = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        removeAnswer(state) {
            state.answer = []
        },
        removeHistory(state) {
            state.history = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAnswer.rejected, (state, action) => {
                console.log(action.payload)
            }) .addCase(submitAnswer.fulfilled, (state, action) => {
                state.answer = action.payload
            }) .addCase(setAnswer.fulfilled, (state, action) => {
                state.answer = action.payload
            }).addCase(setAnswer.rejected, (state, action) => {
                console.log('rejected')
            }) .addCase(updateAnswer.fulfilled, (state, action) => {
                // state.answer = action.payload
            }) .addCase(updateAnswer.rejected, (state, action) => {
                console.log('rejected')
            }) .addCase(answerHistory.fulfilled, (state, action) => {
                state.history = action.payload
            }) .addCase(answerHistory.rejected, (state, action) => {
                console.log(action.payload)
            })
    },
})
export const {removeAnswer, removeHistory} = answerReducer.actions;
export const answerList = state => state.answer.answer.length ? state.answer.answer : [];
export const answerHistoryList = state => state.answer.history;
export default answerReducer.reducer