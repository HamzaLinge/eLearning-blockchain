import React from 'react'
import "./CardCourse.css"

function CardCourse({_idCourse, _title, _resume, _urlPdf, _urlImage, _timestamp, _questionsAnswers}) {


    return (
        <div className="cardCourse">
            <p className="cardCourse__title">{_title}</p>
            <p className="cardCourse__resume">{_resume}</p>
        </div>
    );
}

export default CardCourse;