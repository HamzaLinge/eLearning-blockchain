import React, {useEffect} from 'react'
import "./CardCourse.css"

function CardCourse({_idCourse, _title, _resume, _urlPdf, _urlImage, _timestamp}) {

    useEffect(() => {
        console.log(_idCourse)
        console.log(_title)
        console.log(_resume)
        console.log(_urlPdf)
        console.log(_urlImage)
        console.log(_timestamp)
    }, [])

    return (
        <div className="cardCourse">
            <p className="cardCourse__title">{_title}</p>
            <p className="cardCourse__resume">{_resume}</p>
        </div>
    );
}

export default CardCourse;