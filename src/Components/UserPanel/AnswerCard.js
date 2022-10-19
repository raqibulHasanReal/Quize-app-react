import React, {useEffect, useState} from "react";
import questionStyle from "../../Style/Question.module.css"
import {Button, Col, Form} from "react-bootstrap";
import ModalStyle from "../../Style/Modal.module.css";
import {useDispatch} from "react-redux";
import {submitAnswer, updateAnswer} from "../../Redux/reducers/answerReducer";
import {getAnswerHistoryQuestionId} from "../../Redux/reducers/questionReducer";

const AnswerCard = (props) => {
    const { question, index } = props;
    const [answer, setAnswer] = useState(question.answer);
    const [isSubmit, setSubmit] = useState(false);
    const isReSubmit = !!question.answer;
    const dispatch = useDispatch();
    const [history, setHistory] = useState({});
    const renderOptions = () => {
        const list = [];
        question.options.map((element, index)=> {
            list.push(<Form.Check
                key={index}
                onChange={changeHandler}
                type="radio"
                label={element.option}
                name="options"
                id={element.option}
                value={element.option}
                checked={element.option === answer}
            />)
        })
        return list;
    }

    const changeHandler = (event) => {
        setAnswer(event.target.value)
        setSubmit(false)
    }

    const handleSubmit = () => {
        setSubmit(true)
        const data = {};
        const answerHistory = {};
        const user = JSON.parse(localStorage.getItem('user'));
        answerHistory.history = history.history;
        data.questionId = question.id;
        data.userId = user.id;
        data.userName = user.name;
        data.answer = answer;
        data.previousId = question.answerId
        answerHistory.history.push({ answer: answer, time: Date.now()});
        answerHistory.questionId = question.id;
        answerHistory.userId = user.id;
        answerHistory.userName = user.name;
        if(history.id) answerHistory.historyId = history.id;
        if(isReSubmit) {
            dispatch(updateAnswer({answer: data, answerHistory}))
        } else {
            dispatch(submitAnswer({answer: data, answerHistory}))
        }
    }

    const tryAgain = () => {
        setSubmit(false);
        setAnswer(null)
    }

    useEffect(async ()=> {
        setHistory(await getAnswerHistoryQuestionId(question.id))
    }, [])

    return(
        <div className={questionStyle.answerCard}>
            <Form style={{width: "100%"}}>
                <div className={ModalStyle.option}>
                    <Form.Label>{index+1}. {question.question}</Form.Label>
                    <Col sm={10} className="px-2">
                        {renderOptions()}
                    </Col>
                </div>
                <div className="text-end">
                    { isSubmit ? <Button variant="info" className="btn-sm"  onClick={tryAgain}> Try again </Button>
                        :<Button variant="primary" className="btn-sm" disabled={!answer} onClick={handleSubmit}>{isReSubmit ? "Re submit" : "Submit"}  </Button>}
                </div>
            </Form>
        </div>
    )
}

export default AnswerCard