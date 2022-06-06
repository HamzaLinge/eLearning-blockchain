import React from 'react';
import "./HomePage.css";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleLogOut, selectConnected} from "../authentication/authenticationSlice";
import {URL_LOGIN, URL_SIGNUP} from "../../config";

function HomePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const connected = useSelector(selectConnected);

    return (
        <div className="homepage">
            <div className="homePage__title">
                <p className="homePage__title__item homePage__title__blockchained">Blockchained</p>
                <p className="homePage__title__item homePage__title__learning">Learning</p>
                <p className="homePage__title__item homePage__title__certification">Certification</p>
            </div>
            <div className="homePage__main">
                <div className="homePage__main__description">
                    <strong>BCLC</strong> is a learning platform,
                    where at the end of the MCQ of a course,
                    you will obtain a certificate,
                    attesting to your acquired skills.
                </div>
                <div className="homePage__main__links">
                    {
                        connected ?
                            <Button variant="outlined"
                                    className={"homePage__main__links__link"}
                                    onClick={() => dispatch(handleLogOut())}
                            >Log Out</Button>
                            :
                            <>
                                <Button variant="outlined"
                                        className={"homePage__main__links__link"}
                                        onClick={() => navigate(URL_LOGIN)}
                                >Log In</Button>
                                <Button variant="outlined"
                                        className={"homePage__main__links__link"}
                                        onClick={() => navigate(URL_SIGNUP)}
                                >Sign In</Button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;