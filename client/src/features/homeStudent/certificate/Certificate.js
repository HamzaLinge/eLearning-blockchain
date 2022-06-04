import React from 'react';
import "./Certificate.css";
import {useLocation} from "react-router-dom";

function Certificate() {

    const location = useLocation();

    function getDateNow() {
        const date = new Date();
        return date.toISOString().split("T")[0];
    }

    return (
        <div className="certificate">
            <p className="certificate__title">Certificate</p>
            <p className="certificate__text__I">
                This document declares <strong><i>{location.state.firstName} {location.state.familyName.toUpperCase()}</i></strong> to be certified in <strong>{location.state.titleCourse}</strong>.
            </p>
            <p className="certificate__text__II">
                The Walid-eLearning platform guarantees the authenticity and validation of this certificate.
            </p>
            {/*<p className="certificate__date">{getDateNow()}</p>*/}
        </div>
    );
}

export default Certificate;