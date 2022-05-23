import React from 'react'
import "./CardCourse.css"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CodeIcon from '@mui/icons-material/Code';
import {DEV_MODE, URL_STUDENT_COURSES_COURSE} from "../../../../config";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchCourseById} from "../../homeStudentSlice";

function CardCourse({_idCourse, _title, _resume, _urlPdf, _urlImage, _timestamp}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goToCourse = () => {
        dispatch(fetchCourseById(_idCourse))
        navigate(URL_STUDENT_COURSES_COURSE)
    }

    return (
        <div className="cardCourse">
            <img className={"cardCourse__img"} src={`https://ipfs.io/ipfs/${_urlImage}`} alt={""} />
            <p className="cardCourse__title">{_title}</p>
            <p className="cardCourse__resume">
                {
                    _resume.length >= 150 ?
                        _resume.substr(0, 150).concat(". . .")
                        :
                        _resume
                }
            </p>
            <div className="cardCourse__links">
                <IconButton className="cardCourse__links__link"
                            variant="contained"
                            color={"success"}
                            size={"small"}
                            href={`https://ipfs.io/ipfs/${_urlPdf}`}
                >
                    <PictureAsPdfIcon fontSize="inherit" />
                </IconButton>
                {
                    DEV_MODE ?
                        <IconButton className="cardCourse__btnDownload"
                                    variant="contained"
                                    color={"success"}
                                    size={"small"}
                        >
                            <CodeIcon fontSize="inherit" />
                        </IconButton>
                        :
                        ""
                }
                <IconButton className="cardCourse__btnDownload"
                            variant="contained"
                            color={"secondary"}
                            size={"small"}
                            onClick={goToCourse}
                >
                    <MoreHorizIcon fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    );
}

export default CardCourse;