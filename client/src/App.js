import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import {Login} from "./features/authentication/login/Login";
import {SignUp} from "./features/authentication/signUp/SignUp";
import Header from "./features/header/Header";
import {Routes} from "react-router";


function App() {
  return (
      <div className={"app"}>
        <Header />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>

      </div>
  );
}

export default App;