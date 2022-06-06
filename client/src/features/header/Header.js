import React, {useEffect, useRef} from 'react'
import "./Header.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getAddressAccount,
    handleLogOut,
    selectConnected,
    selectUser
} from "../authentication/authenticationSlice";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {
    DEV_MODE, platformName, ROLE_ADMIN,
    TYPE_EMPLOYEE,
    TYPE_STUDENT,
    URL_ADMIN_ADD_COURSE, URL_ADMIN_LIST_COURSES,
    URL_EMPLOYER, URL_HOMEPAGE, URL_LOGIN, URL_SIGNUP,
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
    const refListCourses = useRef();

    useEffect(() => {
        dispatch(getAddressAccount());
    }, [])

    useEffect(() => {
        if(!connected) {
            navigate(URL_HOMEPAGE);
            return;
        }
        if(user.role === ROLE_ADMIN){
            refListCourses.current.classList.add("header__nav__option__selected");
            navigate(URL_ADMIN_LIST_COURSES);

        }else{
            if(user.typeUser === TYPE_EMPLOYEE) navigate(URL_EMPLOYER);
            else {
                refCourses.current.classList.add("header__nav__option__selected");
                navigate(URL_STUDENT_COURSES);
            }
        }
    }, [connected])

    const goToHomePage = () => {
        const elem = document.querySelector(".header__nav__option__selected");
        if(elem !== undefined) elem.classList.remove("header__nav__option__selected");
        navigate(URL_HOMEPAGE);
    }
    const goToListCoursesAdmin = () => {
        refAddCourse.current.classList.remove("header__nav__option__selected");
        refListCourses.current.classList.add("header__nav__option__selected");
        navigate(URL_ADMIN_LIST_COURSES);
    }
    const goToAddCourse = () => {
        refListCourses.current.classList.remove("header__nav__option__selected");
        refAddCourse.current.classList.add("header__nav__option__selected");
        navigate(URL_ADMIN_ADD_COURSE);
    }
    const goToCourses = () => {
        refProfile.current.classList.remove("header__nav__option__selected");
        refCourses.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_COURSES);
    }

    const goToProfile = () => {
        refCourses.current.classList.remove("header__nav__option__selected");
        refProfile.current.classList.add("header__nav__option__selected");
        navigate(URL_STUDENT_PROFILE);
    }

    return (
        <div className="header">
            <p className="header__title"
               onClick={goToHomePage}
            >{platformName}</p>
            {
                connected ?
                    <div className="header__nav">
                        {
                            user.role === ROLE_ADMIN ?
                                <>
                                    <p ref={refAddCourse} className="header__nav__option" onClick={goToAddCourse}>Add Course</p>
                                    <p ref={refListCourses} className="header__nav__option" onClick={goToListCoursesAdmin}>List Courses</p>
                                </>
                                :
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
                    </div>
                    :
                    ""
            }

            <div className="header__user">
                {
                    connected ?
                        <>
                            <div className="header__user__information">
                                {
                                    user.firstName.length !== 0 ?
                                        <p className="header__user__information__firstName">{user.firstName}</p>
                                        :
                                        ""
                                }
                                <p className="header__user__information__familyName">{String(user.familyName).toUpperCase()}</p>
                            </div>
                            <Button  className={"header__user__btnLogOut"} onClick={() => dispatch(handleLogOut())}>Log Out</Button>
                        </>
                        :
                        <>
                            <Button className={"header__user__btnLogIn"} onClick={() => navigate(URL_LOGIN)}>Log In</Button>
                            <Button className={"header__user__btnSignUp"} onClick={() => navigate(URL_SIGNUP)}>Sign Up</Button>
                        </>
                }
            </div>
        </div>
    );
}

export default Header;