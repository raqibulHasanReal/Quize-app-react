import React, {useRef, useState} from "react";
import historyStyle from "../../../Style/AnswerHistory.module.css";
import {Button, Collapse} from "react-bootstrap";

const UserWiseAnswer = (props) => {
    const {history, userName, correctAnswer} = props;
    const collapse = useRef(null);
    const [open, setOpen] = useState(false);
    const getAnswers = () => {
        const list = [];
        history.map((element, index) => {
            let isCorrect = element.answer === correctAnswer
            const date = new Date();
            date.setTime(element.time)
            list.push(
                <div key={index} className={historyStyle.historyCard}>
                    <div>{element.answer}</div>
                    <div className={isCorrect? historyStyle['correct']: historyStyle['wrong']} >{isCorrect ? "correct": "wrong"}</div>
                    <div>at {date.toLocaleString()} </div>
                </div>
            )
        })
        return list;
    }
    const test = () => {
        console.log(collapse.current)
    }
    return(<>
        <div className={historyStyle.wrapper}>
            <div className={historyStyle.historyList}>
                <div onClick={test}>
                    <strong>{userName}</strong> gave
                    <strong> {history.length} </strong>
                    {history.length>1 ? " answers " : " answer "}
                </div>
                <div>
                    <Button className="mx-1" variant="outline-info" onClick={() =>setOpen(!open)}>
                        Show Details
                    </Button>
                </div>
            </div>
            <div>
                <Collapse in={open}>
                    <div>
                        {getAnswers()}
                    </div>
                </Collapse>
            </div>
        </div>
    </>)
}

export default UserWiseAnswer