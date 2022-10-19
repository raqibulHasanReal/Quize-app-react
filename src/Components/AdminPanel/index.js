import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser} from "../../Redux/reducers/authReducer";
import CreateQuestion from "./Actions/CreateQuestion";
import {Link, useHistory} from "react-router-dom";
import {questionList, setQuestions} from "../../Redux/reducers/questionReducer";
import QuestionCard from "./Question/QuestionCard";
import questionStyle from "../../Style/Question.module.css"

const Index = () => {
    const router = useHistory();
    const dispatch = useDispatch()
    const admin = useSelector(loggedInUser);
    const questions = useSelector(questionList)
    const renderQuestions = () => {
        const list = []
        questions.map((question)=> {
            list.push( <div className={questionStyle.cardWrapper} key={question.id}><QuestionCard question={question}/></div>)
        })
        return list
    }
    useEffect(()=> {
        if (!admin) router.push('/login')
        dispatch(setQuestions());
    },[admin])
    return(
        <div>
            <div className="text-center p-3">
                {admin && admin.name}
            </div>
            <hr/>
            <div className="d-flex justify-content-between">
                <div>
                    Total questions:  <strong> {questions.length}</strong>
                </div>

                <div>
                    <Link to={'/question/create'}>Create new question</Link>
                </div>
            </div>
            <div className={questionStyle.wrapper}>
                { !!renderQuestions().length && renderQuestions() }
            </div>
            <div className="p-5 text-center">
                { !!renderQuestions().length || "No question available" }
            </div>
        </div>
    )
}

export default Index