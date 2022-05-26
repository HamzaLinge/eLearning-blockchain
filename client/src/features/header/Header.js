import React, {useEffect, useRef} from 'react'
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {getAddressAccount, handleLogOut, selectAddressAccount, selectUser} from "../authentication/authenticationSlice";
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

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const refCourses = useRef()
    const refProfile = useRef()
    const refAddCourse = useRef()

    useEffect(() => {
        dispatch(getAddressAccount())
    }, [])

    useEffect(() => {
        console.log("User changed !")
        if(!user.typeUser) navigate("/");
        else{
            if(user.typeUser === TYPE_EMPLOYEE) navigate(URL_EMPLOYER);
            else goToCourses();
        }
    }, [user])

    const goToCourses = () => {
        refProfile.current.classList.remove("header__nav__option__selected");
        if(DEV_MODE) refAddCourse.current.classList.remove("header__nav__option__selected");
        refCourses.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_COURSES);
    }

    const goToProfile = () => {
        refCourses.current.classList.remove("header__nav__option__selected");
        if(DEV_MODE) refAddCourse.current.classList.remove("header__nav__option__selected");
        refProfile.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_PROFILE);
    }
    const goToAddCourse = () => {
        refProfile.current.classList.remove("header__nav__option__selected");
        refCourses.current.classList.remove("header__nav__option__selected");
        if(DEV_MODE) refAddCourse.current.classList.add("header__nav__option__selected");
        navigate(URL_ADD_COURSE);
    }

    return (
        <div className="header">
            <p className="header__title">E-Learning Chain</p>
            {
                user ?
                    <div className="header__nav">
                        {
                            user.typeUser === TYPE_STUDENT ?
                                <>
                                    <p ref={refCourses} className="header__nav__option" onClick={goToCourses}>Courses</p>
                                    <p ref={refProfile} className="header__nav__option" onClick={goToProfile}>Profile</p>
                                    {
                                        DEV_MODE ?
                                            <p ref={refAddCourse} className={"header__nav__option"} onClick={goToAddCourse}>Add Course</p>
                                            :
                                            ""
                                    }

                                </>
                                :
                                user.typeUser === TYPE_EMPLOYEE ?
                                    <p className="header__nav__option">Search</p>
                                    :
                                    ""

                        }
                    </div>
                    :
                    ""
            }

            <div className="header__user">
                {
                    user.length !== 0 ?
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