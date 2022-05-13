import React, {useEffect} from 'react'
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {getAddressAccount, handleLogOut, selectAddressAccount, selectUser} from "../authentication/authenticationSlice";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {TYPE_EMPLOYEE, TYPE_STUDENT} from "../../config";

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const addressAccount = useSelector(selectAddressAccount)

    const signUp = () => {
        navigate("/signUp");
    }
    const logIn = () => {
        navigate("/")
    }
    const logOut = () => {
        dispatch(handleLogOut())
    }

    useEffect(() => {
        dispatch(getAddressAccount())
    }, [])

    useEffect(() => {
        if(!user.addressAccount) navigate("/")
        else{
            if(user.typeUser === TYPE_EMPLOYEE) navigate(TYPE_EMPLOYEE)
            else navigate(TYPE_STUDENT)
        }
    }, [user])

    return (
        <div className="header">
            <p className="header__title">E-Learning Chain</p>
            <div className="header__user">
                {
                    user.addressAccount ?
                        <>
                            <div className="header__user__information">
                                <p className="header__user__information__firstName">{user.firstName}</p>
                                <p className="header__user__information__familyName">{user.familyName.toUpperCase()}</p>
                            </div>
                            <Button  className={"header__user__btnLogOut"} onClick={logOut}>Log Out</Button>
                        </>
                        :
                        <>
                            <Button className={"header__user__btnLogIn"} onClick={logIn}>Log In</Button>
                            <Button className={"header__user__btnSignUp"} onClick={signUp}>Sign Up</Button>
                        </>
                }
            </div>
        </div>
    );
}

export default Header;