import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {userError, loggedInUser, userLogin, clearError} from "../../Redux/reducers/authReducer";
import {useHistory} from "react-router-dom";
import loginStyle from "../../Style/Auth.module.css";

const UserLogin = () => {
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const user = useSelector(loggedInUser)
    const router = useHistory();
    const errorMessage = useSelector(userError)
    const onSubmit = (data) => {
        dispatch(userLogin(data))
    };

    useEffect(()=> {
        if (!!user && user.type === 'admin') {
            router.push('/question');
        } else if(!!user && user.type === 'user') {
            router.push('/quiz');
        }
    }, [user])

    useEffect(()=> {
        setTimeout(()=> {
            dispatch(clearError())
        },2000)
    }, [errorMessage])

    return (
        <div>
            <div className={loginStyle.title}>User Login</div>
            <form className={loginStyle.form} onSubmit={handleSubmit(onSubmit)}>
                <label >Email ( real@gmail.com, user@gmail.com ) </label>
                <input className={loginStyle.input} type="email" {...register("email" ,{ required: true})} />
                {errors.email && <span>This field is required</span>}

                <label>Password ( 12345 )</label>
                <input className={loginStyle.input} {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                {errorMessage && <span style={{color:"red"}}>{errorMessage}</span>}
                <input className={loginStyle.button} type="submit" value="Login"/>
            </form>
        </div>

);
}

export default UserLogin;