import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser} from "../../Redux/reducers/authReducer";
import {questionList, setQuestions} from "../../Redux/reducers/questionReducer";
import AnswerCard from "./AnswerCard";
import {setAnswer} from "../../Redux/reducers/answerReducer";

const QuizSection = () => {
    const dispatch = useDispatch();
    const router = useHistory();
    const user = useSelector(loggedInUser)
    const questions = useSelector(questionList)
    const renderQuestions = () => {
        const list = []
        questions.map((question, index)=> {
            list.push( <div key={question.id}> <AnswerCard index={index} question={question}/></div>)
        })
        return list
    }
    useEffect(()=> {
        if (!user) router.push('/login')
        dispatch(setAnswer());
        dispatch(setQuestions())
    },[user]);

    return(<div>
        <div>
            <div className="text-center p-3">
                Name: {user && user.name}
            </div>
            <hr/>
            <div className={"py-4"}>
                { !!renderQuestions().length ?
                    renderQuestions():
                    <div className="p-5 text-center">
                        No questions available
                    </div>}
            </div>
        </div>
    </div>)
}

export default QuizSection