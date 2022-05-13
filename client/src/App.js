import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import {Login} from "./features/authentication/login/Login";
import {SignUp} from "./features/authentication/signUp/SignUp";
import Header from "./features/header/Header";
import {Routes} from "react-router";
import HomeStudent from "./features/homeStudent/HomeStudent";


function App() {
  return (
      <>
          <Header />
          <div className={"app"}>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/employee" element={<HomeStudent />} />
                  <Route path="/student" element={<HomeStudent />} />
              </Routes>
          </div>
      </>
  );
}

export default App;