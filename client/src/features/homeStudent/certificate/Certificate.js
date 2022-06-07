import React from 'react';
import "./Certificate.css";
import {useLocation} from "react-router-dom";
import {platformName} from "../../../config";

function Certificate() {

    const location = useLocation();

    return (
        <div className={"certificate"}>
            <p className={"certificate__title"}>
                <span className={"certification__title__char"}>C</span>
                <span className={"certification__title__char"}>E</span>
                <span className={"certification__title__char"}>R</span>
                <span className={"certification__title__char"}>T</span>
                <span className={"certification__title__char"}>I</span>
                <span className={"certification__title__char"}>F</span>
                <span className={"certification__title__char"}>I</span>
                <span className={"certification__title__char"}>C</span>
                <span className={"certification__title__char"}>A</span>
                <span className={"certification__title__char"}>T</span>
                <span className={"certification__title__char"}>E</span>
            </p>
            <p className="certificate__text__I">
                This document declares <strong><i>{location.state.firstName} {location.state.familyName.toUpperCase()}</i></strong> to be certified in <strong>{location.state.titleCourse}</strong>.
            </p>
            <p className="certificate__text__II">
                The {platformName} platform guarantees the authenticity and validation of this certificate.
            </p>
        </div>
    );
}

export default Certificate;