import React, {useEffect} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loggedInUser, logOut} from "../Redux/reducers/authReducer";
import {removeQuestion} from "../Redux/reducers/questionReducer";
import {removeAnswer, removeHistory} from "../Redux/reducers/answerReducer";
import {Link} from "react-router-dom";

const Header = () => {
    const user = useSelector(loggedInUser);
    const dispatch = useDispatch()
    const signOut = () => {
        dispatch(logOut());
        dispatch(removeQuestion());
        dispatch(removeAnswer());
        dispatch(removeHistory());
    }
  return(
      <>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Container>
                  <Navbar.Brand href="/">Quiz Strativ</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  { !!user && <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="me-auto">
                      </Nav>
                      <Nav>
                          <div style={{cursor:"pointer", color:"blue",textDecoration: "underline"}} onClick={signOut}>
                              <div> Sign out</div>
                          </div>
                      </Nav>
                  </Navbar.Collapse>}
                  {!user && <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="me-auto">
                      </Nav>
                      <Nav>
                          <Link to={'information'}>information </Link>
                      </Nav>
                  </Navbar.Collapse>}
              </Container>
          </Navbar>
      </>
  )
}

export default Header