import React, {useState} from "react";
import AdminLogin from "../Components/Auth/AdminLogin";
import UserLogin from "../Components/Auth/UserLogin";
import loginStyle from '../Style/Auth.module.css'
const Login = () => {
    const [isAdminView, setLoginView] = useState(true);
    const changeLoginView = () => {
      setLoginView(( isAdminView) => !isAdminView )
    }
    return(
        <div className={loginStyle.loginWrapper}>
            {isAdminView ? <AdminLogin/> : <UserLogin/>}
            <p className={loginStyle.loginAs} onClick={changeLoginView} >
                { `Login as ${isAdminView ? 'User' : 'Admin'} ? Click here` }
            </p>
        </div>
    )
}

export default Login;