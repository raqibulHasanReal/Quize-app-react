import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {answerHistory, answerHistoryList} from "../../../Redux/reducers/answerReducer";
import {Link, useHistory, useParams} from "react-router-dom";
import {getCorrectAnswerById, setQuestions} from "../../../Redux/reducers/questionReducer";
import {loggedInUser} from "../../../Redux/reducers/authReducer";
import UserWiseAnswer from "../Answer/UserWiseAnswer";

const Question = () => {
    const router = useHistory();
    const dispatch = useDispatch()
    const { id } = useParams();
    const history = useSelector(answerHistoryList)
    const admin = useSelector(loggedInUser);
    const [correctAnswer, setCorrectAns] = useState(null);

    useEffect(()=>{
        dispatch(answerHistory(id));
        getCorrectAnswerById(parseInt(id)).then((res)=> {
            setCorrectAns(res);
        })
    },[])

    useEffect(()=> {
        if (!admin) {
            router.push('/login')
        }
        dispatch(setQuestions());
    },[admin])

    const getHistoryByUser = () => {
      const list = []
        history.map((element, index)=> {
            list.push(<UserWiseAnswer key={index} history={element.history} correctAnswer={correctAnswer} userName={element.userName}/>)
        })
        return list
    }

    return(<div>
        <div className="text-center p-3">
            {admin && admin.name}
        </div>
        <hr/>

        <Link to={'/question'}>
            <div className="text-decoration-underline py-4">
                back to question page
            </div>
        </Link>

        <div>
            { !!getHistoryByUser().length ?
                getHistoryByUser() :
                <div className="p-5 text-center">
                    No answer available
                </div>
            }
        </div>
    </div>)
}

export default Question