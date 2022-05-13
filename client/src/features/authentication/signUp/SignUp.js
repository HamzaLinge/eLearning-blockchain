import React, {useEffect, useState} from 'react'
import "./SignUp.css"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getAddressAccount,
    selectAddressAccount, selectError, selectLoading,
    selectUser,
    signUp__blockchain,
} from "../authenticationSlice";

export const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addressAccount = useSelector(selectAddressAccount)
    const user = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [typeUser, setTypeUser] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    
    const goToLogin = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const signUp = (e) => {
        e.preventDefault()
        dispatch(signUp__blockchain({firstName, familyName, typeUser, password}))
    }

    useEffect(()=>{
        dispatch(getAddressAccount())
    }, [])
    
    useEffect(()=>{
        if(user.addressAccount !== ""){
            console.log("Sign up success !")
            console.log(user)
        }
    }, [user])

    return(
        <form className="signUp">
            <p className="signUp__title">SignUp</p>
            <div className="signUp__addressAccount">
                <p className="signUp__addressAccount__label">Account's Address :</p>
                <p className="signUp__addressAccount__address">
                    {
                        addressAccount ? addressAccount.toString() : <i>None</i>
                    }
                </p>
            </div>
            <div className="signUp__firstName">
                <p className="signUp__firstName__label">First Name</p>
                <input type="text" className="signUp__firstName__input"
                       value={firstName}
                       onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div className="signUp__familyName">
                <p className="signUp__familyName__label">Family Name</p>
                <input type="text" className="signUp__familyName__input"
                       value={familyName}
                       onChange={e => setFamilyName(e.target.value)}
                />
            </div>
            <div className="signUp__typeUser">
                <p className="signUp__typeUser__label">Type</p>
                <select className="signUp__typeUser__select" value={typeUser}
                        onChange={e => {
                            setTypeUser(e.target.value)
                        }}
                >
                    <option className="signUp__typeUser__select__option">Student</option>
                    <option className="signUp__typeUser__select__option">Employee</option>
                </select>
            </div>
            <div className="signUp__password">
                <p className="signUp__password__label">Password</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="signUp__password__input"/>
            </div>
            <div className="signUp__passwordConfirm">
                <p className="signUp__passwordConfirm__label">Password Confirm</p>
                <input type="password" disabled={!password} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} className="signUp__passwordConfirm__input"/>
            </div>
            <button className="signUp__btnSignUp"
                    // disabled={!addressAccount || !firstName || !familyName || !password || !passwordConfirm}
                    onClick={signUp}>Sign Up</button>
            <button className="signUp__btnLogin" onClick={goToLogin}>Login</button>
        </form>
    )
}