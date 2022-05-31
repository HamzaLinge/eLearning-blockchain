import React from 'react';
import "./HomeEmployer.css";
import Search from "./search/Search";
import Dashboard from "./dashboard/Dashboard";
import Result from "./result/Result";

function HomeEmployer() {
    return (
        <div className="homeEmployer">
            <Search />
            <Dashboard />
            <Result />
        </div>
    );
}

export default HomeEmployer;