import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import {Login} from "./features/authentication/login/Login";
import {SignUp} from "./features/authentication/signUp/SignUp";
import Header from "./features/header/Header";
import {Routes} from "react-router";
import Courses from "./features/homeStudent/Courses/Courses";
import Profile from "./features/homeStudent/Profile/Profile";
import {URL_ADD_COURSE, URL_STUDENT_COURSES, URL_STUDENT_COURSES_COURSE, URL_STUDENT_PROFILE} from "./config";
import {AddCourse} from "./features/setCourse/addCourse/AddCourse";
import Course from "./features/homeStudent/Course/Course";


function App() {
  return (
      <>
          <Header />
          <div className={"app"}>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signUp" element={<SignUp />} />
                  {/*<Route path="/employee" element={<HomeStudent />} />*/}
                  <Route path={URL_STUDENT_COURSES} element={<Courses />} />
                  <Route path={URL_STUDENT_PROFILE} element={<Profile />} />
                  <Route path={URL_ADD_COURSE} element={<AddCourse />} />
                  <Route path={URL_STUDENT_COURSES_COURSE} element={<Course />} />
              </Routes>
          </div>
      </>
  );
}

export default App;