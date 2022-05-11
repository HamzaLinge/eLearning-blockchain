import React, {useState} from 'react'
import "./Login.css"
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()

    const [accountAddress, setAccountAddress] = useState(undefined)
    const [password, setPassword] = useState("")

    const goToSignUp = (e) => {
        e.preventDefault()
        navigate("signUp")
    }

    return(
        <form className="login">
            <p className="login__title">Login</p>
            <div className="login__accountAddress">
                <p className="login__accountAddress__label">Account's Address</p>
                <p className="login__accountAddress__address">{accountAddress}</p>
            </div>
            <div className="login__password">
                <p className="login__password__label">Password</p>
                <input type="password" className="login__password__input"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="login__btnLogin">Login</button>
            <button className="login__btnSignUp" onClick={goToSignUp}>Sign Up</button>
        </form>
    )
}