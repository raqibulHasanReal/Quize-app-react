import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {quizDatabase} from "../../App";

const fetchQuestions = async () => {
    if(!!localStorage.getItem('user')) {
        return quizDatabase.question.toArray();
    } else {
         return []
    }
}

const getQuestionWithAnswer = (state) => {
    const list = []
    const answers = state.answer.answer;
    const questions = state.question.question;
    questions.map( (question) => {
        let checker = true;
        answers.map(async (answer)=>{
            if (question.id === answer.questionId) {
                checker = false
                list.push({...question, answerId:answer.id, answer: answer.answer})
            }
        })
        if (checker) {
            list.push(question)
        }
    })

    return list;
}

export const getCorrectAnswerById = async (id) => {
    let question = await quizDatabase.question.where({id: id}).first();
    let correctAns = null
    question.options.map((option) => {
        if (option.correctAnswer) correctAns = option.option
    })
    return correctAns
}

export const getAnswerHistoryQuestionId = async (questionId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const ansHistory = await quizDatabase.answerHistory.where({questionId, userId: user.id}).first();
    return ansHistory ? { history: ansHistory.history,id: ansHistory.id } : { history: [], id:null};
}

export const getQuestionByID = async (id) => {
    return quizDatabase.question.where({id: parseInt(id)}).first()
}

const initialState = {
    question:  []
};

export const createQuestion = createAsyncThunk(
    'question/store',
    async (question, { rejectWithValue }) => {
        try {
            return quizDatabase.question.add(question).then( async () => {
                return fetchQuestions();
            })
        } catch (e) {
            return e.message()
        }
    }
);

export const updateQuestion = createAsyncThunk(
    'question/update',
    async (questiondata, { rejectWithValue }) => {
        try {
            const admin = JSON.parse(localStorage.getItem('user'));
            const {question, options, id} = questiondata;
            return quizDatabase.question.update(id, {question, options, authorName: admin.name}).then( async () => {
                return fetchQuestions();
            })

        } catch (e) {
            console.log(e)
        }
    }
);

export const setQuestions = createAsyncThunk(
    'question/set',
    async (val=null, { rejectWithValue }) => {
        try {
            return await fetchQuestions().then( (res)=> res );
        } catch (e) {
            console.log(e)
        }
    }
);

export const deleteQuestions = createAsyncThunk(
    'question/delete',
    async (id, { rejectWithValue }) => {
        try {
            return quizDatabase.question.delete(id).then( async () => {
                return fetchQuestions();
            });
        } catch (e) {
            console.log(e)
        }
    }
);

export const questionReducer = createSlice({
    name: 'question',
    initialState,
    reducers: {
        removeQuestion(state) {
            state.question = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestion.rejected, (state, action) => {
                console.log('rejected')
            }) .addCase(createQuestion.fulfilled, (state, action) => {
                state.question = action.payload
            }) .addCase(setQuestions.fulfilled, (state, action) => {
                state.question = action.payload
            }) .addCase(setQuestions.rejected, (state, action) => {
                console.log('rejected')
            }) .addCase(deleteQuestions.fulfilled, (state, action) => {
                state.question = action.payload
            }) .addCase(deleteQuestions.rejected, (state, action) => {
                console.log('rejected')
            }).addCase(updateQuestion.fulfilled, (state, action) => {
                state.question = action.payload
            }) .addCase(updateQuestion.rejected, (state, action) => {
                console.log('rejected')
            })
    },
})
export const {removeQuestion} = questionReducer.actions
export const questionList = (state) => {
    if(state.question.question.length) {
        return getQuestionWithAnswer(state)
    } else {
        return []
    }
};
export default questionReducer.reducer