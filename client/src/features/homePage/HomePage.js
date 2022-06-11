import React, {useEffect} from 'react';
import "./HomePage.css";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleLogOut, selectConnected} from "../authentication/authenticationSlice";
import {imgPathArrayExported, URL_LOGIN, URL_SIGNUP} from "../../config";

function HomePage() {

    const IMG_WIDTH = 400;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const connected = useSelector(selectConnected);

    const imgPathArray = imgPathArrayExported; // imgPathArrayExported is from "config.js"

    let position = 0;
    let rightDirection = true;

    useEffect(() => {
        setInterval(() => {
            const allSpan = document.querySelectorAll(".homePage__images__indicator span");
            if(rightDirection){
                allSpan[position].style.backgroundColor = "transparent";
                position++;
                if(position === imgPathArray.length - 1){
                    rightDirection = !rightDirection;
                }
                document.querySelector(".homePage__images__wrapper").style.transform = 'translateX(-'+String(Math.abs(position * IMG_WIDTH))+'px)';
                allSpan[position].style.backgroundColor = "#fbfbfb";
            }
            else{
                allSpan[position].style.backgroundColor = "transparent";
                position--;
                if(position === 0){
                    rightDirection = !rightDirection;
                }
                document.querySelector(".homePage__images__wrapper").style.transform = 'translateX(-'+String(Math.abs(position * IMG_WIDTH))+'px)';
                allSpan[position].style.backgroundColor = "#fbfbfb";
            }
        }, 3000);
    }, [])

    return (
        <div className="homePage">
            <div className="homePage__images">
                <div className="homePage__images__wrapper">
                    {
                        imgPathArray.map(imgPath => (
                            <div className="homePage__images__wrapper__img">
                                <img src={imgPath} alt={imgPath}/>
                            </div>
                        ))
                    }
                </div>
                <div className="homePage__images__indicator">
                    {
                        imgPathArray.map(imgPath => (<span></span>))
                    }
                </div>
            </div>
            {/*<div className="homePage__title">*/}
            {/*    <p className="homePage__title__item homePage__title__blockchained">Blockchained</p>*/}
            {/*    <p className="homePage__title__item homePage__title__learning">Learning</p>*/}
            {/*    <p className="homePage__title__item homePage__title__certification">Certification</p>*/}
            {/*</div>*/}
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
                                >Sign Up</Button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;