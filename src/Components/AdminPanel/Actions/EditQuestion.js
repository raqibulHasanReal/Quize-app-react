import React, {useEffect, useState} from "react";
import {Button, Col, Collapse, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import questionStyle from "../../../Style/Question.module.css"
import {useDispatch, useSelector} from "react-redux";
import {createQuestion, getQuestionByID, setQuestions, updateQuestion} from "../../../Redux/reducers/questionReducer";
import {Link, useHistory, useParams} from "react-router-dom";
import {loggedInUser} from "../../../Redux/reducers/authReducer";

const EditQuestion = (props) => {
    const {quesDetails} = props;
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const loggedIn = useSelector(loggedInUser);
    const {id} = useParams();
    const router = useHistory();
    const [options, setOptions] = useState([{"option":''},{"option":''},{"option":''},{"option":''}]);
    let currentAnswer = null
    options.map((option, index) => {
        if(option.correctAnswer){
            currentAnswer = index
        }
    });
    const [correctAnswer, setCorrectAnswer] = useState(currentAnswer);

    const getOptions = () => {
        const list = [];
        options.map((option, index)=> {
            list.push(
                <Col sm={6} className="my-3" key={index}>
                    <InputGroup className="align-items-center">
                        <Form.Check onChange={setCorrectAns} type="radio" id={index} name={'option'} checked={index == correctAnswer} />
                        <FormControl onChange={setOptionValue} value={option.option} id={index} placeholder={`Option`} />
                    </InputGroup>
                </Col>
            )
        })
        return list;
    };

    let immutableOptions = [...options]
    const setOptionValue = (event) => {
        let index = event.target.id;
        if(index === '') index = 0;

        immutableOptions[index] = { option: event.target.value}
        setOptions(immutableOptions)
    }

    const setCorrectAns = (event) => {
        let value = event.target.id
        if(value === '') value = '0'
        console.log(value)
        setCorrectAnswer(value);
    }

    const clearData = () => {
        setQuestion('');
        setOptions([{"option":''},{"option":''},{"option":''},{"option":''}])
        setCorrectAnswer(null);
        router.push('/question')
    }

    const saveQuestion = () => {
        if(hasError()) return
        const list = []
        options.map(({...option},index) => {
            option.correctAnswer = index === parseInt(correctAnswer);
            list.push(option)
        })
        dispatch(updateQuestion({question, options: list, id: parseInt(id) }))

        clearData();
    }

    const hasError = () => {
        if(!question) {
            alert('please set a question !');
            return true
        } else if((options[0].option ==='', options[1].option ==='', options[2].option ==='', options[3].option ==='')) {
            alert('please add some options');
            return true
        } else if(!correctAnswer) {
            alert('please tick a option as correct answer.');
            return true
        } else {
            return false
        }
    }

    useEffect(()=>{
        if (!!Object.keys(quesDetails).length){
            setQuestion(quesDetails.question);
            setOptions(quesDetails.options)
        }
    },[quesDetails])

    useEffect(()=> {
        setCorrectAnswer(currentAnswer)
    },[currentAnswer])

    useEffect(()=> {
        if (!loggedIn) {
            router.push('/login')
        }
        dispatch(setQuestions());
    },[loggedIn])

    return(
<>
        <Link to={'/question'}>
            <div className="text-decoration-underline py-4">
                back to question page
            </div>
        </Link>
        <Form className={questionStyle.createForm}>
            <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control as="textarea" onChange={(event)=> {setQuestion(event.target.value)}} value={question} rows={3} />
            </Form.Group>

            <Form.Label>
                Options ( please click the wright answer )
            </Form.Label>

            <Row className="align-items-center">
                {getOptions()}
            </Row>

            <Row className="align-items-center">
                <Col sm={12}>
                    <Button className={questionStyle.saveButton} variant="primary" type={"button"} onClick={saveQuestion}>
                        Update question
                    </Button>
                </Col>
            </Row>
        </Form>
</>
    );
}

export default EditQuestion