import React, {useEffect, useRef} from 'react'
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getAddressAccount,
    handleLogOut,
    selectAddressAccount,
    selectConnected,
    selectUser
} from "../authentication/authenticationSlice";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {
    DEV_MODE,
    TYPE_EMPLOYEE,
    TYPE_STUDENT,
    URL_ADD_COURSE,
    URL_EMPLOYER,
    URL_STUDENT_COURSES,
    URL_STUDENT_PROFILE
} from "../../config";
import {toggleOpenSearch} from "../homeEmployer/homeEmployerSlice";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const connected = useSelector(selectConnected);

    const refCourses = useRef();
    const refProfile = useRef();
    const refAddCourse = useRef();

    useEffect(() => {
        dispatch(getAddressAccount());
    }, [])

    useEffect(() => {
        if(!connected) {
            navigate("/");
            return;
        }
        if(user.typeUser === TYPE_EMPLOYEE) navigate(URL_EMPLOYER);
        else {
            refCourses.current.classList.add("header__nav__option__selected");
            navigate(URL_STUDENT_COURSES);
        }
    }, [connected])

    const goToCourses = () => {
        refProfile.current.classList.remove("header__nav__option__selected");
        // if(DEV_MODE) refAddCourse.current.classList.remove("header__nav__option__selected");
        refCourses.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_COURSES);
    }

    const goToProfile = () => {
        refCourses.current.classList.remove("header__nav__option__selected");
        // if(DEV_MODE) refAddCourse.current.classList.remove("header__nav__option__selected");
        refProfile.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_PROFILE);
    }
    const goToAddCourse = () => {
        // refProfile.current.classList.remove("header__nav__option__selected");
        // refCourses.current.classList.remove("header__nav__option__selected");
        // if(DEV_MODE) refAddCourse.current.classList.add("header__nav__option__selected");
        navigate(URL_ADD_COURSE);
    }

    return (
        <div className="header">
            <p className="header__title">E-Learning Chain</p>
            {
                connected ?
                    <div className="header__nav">
                        {
                            user.typeUser === TYPE_STUDENT ?
                                <>
                                    <p ref={refCourses} className="header__nav__option" onClick={goToCourses}>Courses</p>
                                    <p ref={refProfile} className="header__nav__option" onClick={goToProfile}>Profile</p>
                                </>
                                :
                                user.typeUser === TYPE_EMPLOYEE ?
                                    <p className="header__nav__option" onClick={() => dispatch(toggleOpenSearch())}>Search</p>
                                    :
                                    ""

                        }
                        {
                            DEV_MODE ?
                                <p ref={refAddCourse} className={"header__nav__option"} onClick={goToAddCourse}>Add Course</p>
                                :
                                ""
                        }
                    </div>
                    :
                    ""
            }

            <div className="header__user">
                {
                    connected ?
                        <>
                            <div className="header__user__information">
                                <p className="header__user__information__firstName">{user.firstName}</p>
                                <p className="header__user__information__familyName">{String(user.familyName).toUpperCase()}</p>
                            </div>
                            <Button  className={"header__user__btnLogOut"} onClick={() => dispatch(handleLogOut())}>Log Out</Button>
                        </>
                        :
                        <>
                            <Button className={"header__user__btnLogIn"} onClick={() => navigate("/")}>Log In</Button>
                            <Button className={"header__user__btnSignUp"} onClick={() => navigate("/signUp")}>Sign Up</Button>
                        </>
                }
            </div>
        </div>
    );
}

export default Header;