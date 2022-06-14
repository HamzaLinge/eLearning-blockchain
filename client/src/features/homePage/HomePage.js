import React, {useEffect} from 'react';
import "./HomePage.css";
import {imgPathArrayExported} from "../../config";
import {useDispatch} from "react-redux";
import {setIdMyInterval} from "../authentication/authenticationSlice";

function HomePage() {

    const IMG_WIDTH = 400;

    const dispatch = useDispatch();

    const imgPathArray = imgPathArrayExported; // imgPathArrayExported is from "config.js"

    let position = 0;
    let rightDirection = true;


    useEffect(() => {
        const idSetInterval = setInterval(() => {
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
        dispatch(setIdMyInterval(idSetInterval));
    }, [])

    return (
        <div className="homePage">
            <div className="homePage__images">
                <div className="homePage__images__wrapper">
                    {
                        imgPathArray.map((imgPath, i) => (
                            <div key={i} className="homePage__images__wrapper__img">
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
            {/*<div className="homePage__main">*/}
            {/*    <div className="homePage__main__text">*/}
            {/*        <strong>BCLC</strong> is a learning platform,*/}
            {/*        where at the end of the MCQ of a course,*/}
            {/*        you will obtain a certificate,*/}
            {/*        attesting to your acquired skills.*/}
            {/*    </div>*/}
                {/*<div className={"homePage__main__text"}>*/}
                {/*    // Zone de texte*/}
                {/*</div>*/}
            {/*</div>*/}
            <div className="homePage__text">
                <strong>BCLC</strong> is a learning platform,
                where at the end of the MCQ of a course,
                you will obtain a certificate,
                attesting to your acquired skills.
            </div>
            <div className="homePage__logo">
                <img src={"Logo-black.png"} alt={""} className={"homePage__logo__img"} />
            </div>
        </div>
    );
}

export default HomePage;