import React from "react";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteQuestions} from "../../../Redux/reducers/questionReducer";
import {Link} from "react-router-dom";
import questionStyle from "../../../Style/Question.module.css"

const QuestionCard = (props) => {
    const {question} = props;
    const dispatch = useDispatch();
    const deleteHandler = () => {
        if (confirm('Are you sure you want to delete this question ?')) {
            dispatch(deleteQuestions(question.id))
        }
    }

    function getOptions() {
        const list = [];
            question.options.map((ele, index) => {
                list.push(<ListGroupItem key={index}>{index+1}. {ele.option}</ListGroupItem>)
            })
        return list
    }

    return (
        <Card className={questionStyle.questionCard}>
            <Card.Body>
                <Card.Text>
                    {question.question}
                </Card.Text>
                <div className="text-info" style={{fontSize:"14px", marginTop:"8px"}}>
                    <span className="text-decoration-underline text-info">created by:</span> {question.authorName}
                </div>
            </Card.Body>
            <Card.Title className="text-secondary px-3">Options:</Card.Title>
            <ListGroup className="list-group-flush">
                {getOptions()}
            </ListGroup>
            <ListGroup className="list-group-flush p-3">
                <Card.Title className="text-secondary">
                    Correct Answer:
                </Card.Title>
                {question.options.map((ele, index) => {
                    if(ele.correctAnswer) return <div key={index} className="text-success">{index+1}. {ele.option}</div>
                })}
            </ListGroup>
            <Card.Body>
                <Link to={`question/${question.id}`}><Button className="mx-1" variant="outline-info">History</Button></Link>
                <Link to={`question/${question.id}/update`}><Button className="mx-1" variant="outline-secondary">Update</Button></Link>
                <Button className="mx-1" variant="outline-danger" onClick={deleteHandler}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default QuestionCard;