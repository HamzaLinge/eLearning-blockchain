import React, {useEffect, useRef} from 'react';
import "./Profile.css";
import {useDispatch, useSelector} from "react-redux";
import {getAllMyCourses, selectAllMyCourses, selectLoadAllMyCourses} from "../homeStudentSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";

function Profile() {

    const dispatch = useDispatch();

    const allMyCourses = useSelector(selectAllMyCourses);
    const loadAllMyCourses = useSelector(selectLoadAllMyCourses);

    const refAllCourses = useRef();
    const refCertifiedCourses = useRef();
    const refInProgressCourses = useRef();

    useEffect(() => {
        selectCourses();
        dispatch(getAllMyCourses());
    }, [])

    const selectCourses = () => {
        refAllCourses.current.classList.add("profile__sideBar__option__selected");
        refCertifiedCourses.current.classList.remove("profile__sideBar__option__selected");
        refInProgressCourses.current.classList.remove("profile__sideBar__option__selected");
    }
    const selectCertifiedCourses = () => {
        refAllCourses.current.classList.remove("profile__sideBar__option__selected");
        refCertifiedCourses.current.classList.add("profile__sideBar__option__selected");
        refInProgressCourses.current.classList.remove("profile__sideBar__option__selected");
    }
    const selectInProgressCourses = () => {
        refAllCourses.current.classList.remove("profile__sideBar__option__selected");
        refCertifiedCourses.current.classList.remove("profile__sideBar__option__selected");
        refInProgressCourses.current.classList.add("profile__sideBar__option__selected");
    }

    return (
        <div className="profile">
            <div className="profile__sideBar">
                <p onClick={selectCourses} ref={refAllCourses} className="profile__sideBar__option profile__sideBar__courses">
                    All my courses
                </p>
                <p onClick={selectCertifiedCourses} ref={refCertifiedCourses} className="profile__sideBar__option profile__sideBar__certifiedCourses">
                    <span className="pointSymbol">&#8226;</span> Certified courses
                </p>
                <p onClick={selectInProgressCourses} ref={refInProgressCourses} className="profile__sideBar__option profile__sideBar__inProgressCourses">
                    <span className="pointSymbol">&#8226;</span> In progress courses
                </p>
            </div>
            <div className="profile__main">
                {
                    loadAllMyCourses ?
                        <CircularProgress color="success" />
                        :
                        allMyCourses.length === 0 ?
                            <Alert severity="info">You are not taking any courses !</Alert>
                            :
                            <div className="profile__main__table">
                                <div className="profile__main__table__header">
                                    <p className="profile__main__table__header__head profile__main__table__header__number"></p>
                                    <p className="profile__main__table__header__head">Title</p>
                                    <p className="profile__main__table__header__head">Progress (%)</p>
                                    <p className="profile__main__table__header__head">Download Course (Pdf)</p>
                                </div>
                                {
                                    allMyCourses.map((course, indexCourse) => (
                                        <div className="profile__main__table__row">
                                            <p className="profile__main__table__row__cell">{indexCourse + 1}</p>
                                            <p className="profile__main__table__row__cell">{course.title}</p>
                                            <p className="profile__main__table__row__cell">{course.progress}</p>
                                            <p className="profile__main__table__row__cell">
                                                <IconButton className="cardCourse__links__link"
                                                            variant="contained"
                                                            color={"success"}
                                                            size={"small"}
                                                            onClick={() => {
                                                                window.open(`https://ipfs.io/ipfs/${course.urlPdf}`, "_blank")
                                                            }}>
                                                    <PictureAsPdfIcon fontSize="inherit" />
                                                </IconButton>
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                }
            </div>
        </div>
    );
}

export default Profile;