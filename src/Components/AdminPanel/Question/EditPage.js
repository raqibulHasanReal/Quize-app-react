import React, {useEffect, useState} from "react";
import EditQuestion from "../Actions/EditQuestion";
import {getQuestionByID} from "../../../Redux/reducers/questionReducer";
import {useParams} from "react-router-dom";

const QuestionEdit = () => {
    const [quesDetails, setQuestion] = useState({})
    const { id } = useParams();

    useEffect(()=> {
        getQuestionByID(id).then((res)=> {
            setQuestion(res)
        })
    },[])

    return(
        <div>
            <EditQuestion quesDetails={quesDetails}/>
        </div>
    )

}

export default QuestionEdit