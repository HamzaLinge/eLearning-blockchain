import React, {useEffect, useState} from 'react';
import "./Course.css";
import {useSelector} from "react-redux";
import {selectCourse, selectErrorFetchCourses, selectLoadingCourses} from "../homeStudentSlice";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CircularProgress from "@mui/material/CircularProgress";


function Course() {

    const course = useSelector(selectCourse)
    const loadingCourse = useSelector(selectLoadingCourses)
    const errorFetchCourse = useSelector(selectErrorFetchCourses)

    return (
        <div className="course">
            {
                loadingCourse ?
                    <CircularProgress color="success" />
                    :
                    errorFetchCourse.length !== 0 ?
                        <Alert severity="error">{errorFetchCourse}</Alert>
                        :
                        course.length === 0 ?
                            <Alert severity="warning">No Course selected !</Alert>
                            :
                            <>
                                <img src={`https://ipfs.io/ipfs/${course.urlImage}`} alt="" className={"course__img"}/>
                                <p className="course__title">{course.title}</p>
                                <p className="course__resume">{course.resume}</p>
                                <div className="course__links">
                                    <Button variant="contained"
                                            endIcon={<PictureAsPdfIcon />}
                                            className={"course__links__link"}
                                            href={`https://ipfs.io/ipfs/${course.urlPdf}`}
                                    >
                                        Download PDF
                                    </Button>
                                    <Button variant="contained"
                                            endIcon={<QuestionAnswerIcon />}
                                            className={"course__links__link"}
                                            color={"success"}
                                    >
                                        Pass the QCM
                                    </Button>
                                </div>
                            </>
            }
        </div>
    );
}

export default Course;