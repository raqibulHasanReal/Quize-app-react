import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNotFound from '../src/Pages/PageNotFound'
import {BrowserRouter as Router, Switch, Route, Redirect, useParams} from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import {Col, Container, Row} from "react-bootstrap";
import QuizSection from "./Components/UserPanel/QuizSection";
import {useDispatch} from "react-redux";
import {setAuthUser} from "./Redux/reducers/authReducer";
import {getRedirectPath, isAdmin, isLogin, isUser} from "./Service/RouteService";
import Index from "./Components/AdminPanel";
import Question from "./Components/AdminPanel/Question/Question";
import Information from "./Components/Information";
import Dexie from "dexie";
import CreateQuestion from "./Components/AdminPanel/Actions/CreateQuestion";
import QuestionEdit from "./Components/AdminPanel/Question/EditPage";

export const quizDatabase = new Dexie("Quiz");
quizDatabase.version(2).stores({
    question: "++id,question,options,authorName",
    answer: "++id,questionId,userId,answer",
    answerHistory: "++id,history,answerId,questionId,userId,userName"
});
quizDatabase.open();

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=> {
        if(!!localStorage.getItem('user')) {
            dispatch(setAuthUser());
        }
    },[user])

    return (
        <Router>
            <Header/>
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to={"/login"} />
                                </Route>
                                <Route exact path="/login" render={()=> ( isLogin() ? <Redirect to={getRedirectPath()} /> : <Login/> )} />
                                <Route exact path="/question" render={() => ( isAdmin() ? <Index/> : <Redirect to="/login" /> )} />
                                <Route exact path="/question/create" render={() => ( isAdmin() ? <CreateQuestion/> : <Redirect to="/login" /> )} />
                                <Route exact path="/question/:id" render={() => ( isAdmin() ? <Question/> : <Redirect to="/login" /> )} />
                                <Route exact path="/question/:id/update" render={() => ( isAdmin() ? <QuestionEdit/> : <Redirect to="/login" /> )} />
                                <Route exact path="/quiz" render={() => ( isUser() ? <QuizSection/> : <Redirect to="/login" /> )} />
                                <Route exact path="/information" component={Information}  />
                                <Route path='*' exact component={PageNotFound} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
        </Router>
    );
}

export default App;
