import React from 'react';
import "./Dashboard.css";
import {useSelector} from "react-redux";
import {selectDashboard} from "../homeEmployerSlice";

function Dashboard() {

    const dashboard = useSelector(selectDashboard);

    return (
        <div className="dashboard">
            {
                dashboard.length !== 0 ?
                    <>
                        <div className="dashboard__header">
                            <p className="dashboard__header__course">Course Title</p>
                            <p className="dashboard__header__name">First Name</p>
                            <p className="dashboard__header__name">Family Name</p>
                        </div>
                        <div className="dashboard__set">
                            <p className="dashboard__set__data">{dashboard.titleCourse}</p>
                            <p className="dashboard__set__data">{dashboard.firstName}</p>
                            <p className="dashboard__set__data">{dashboard.familyName}</p>
                        </div>
                    </>
                    :
                    ""
            }
        </div>
    );
}

export default Dashboard;