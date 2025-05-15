import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import SessionsChart from "../Session/Session";
import "../../styles/admin/Dashboard.css"
import LastYearBookingInfo from "./LastYearBookingInfo";
import PendingApprovals from "./PendingApproval";
import CuntryChart from "./CountyChart";

function Dashboard() {
    return (
        <div>
            <div className="d-flex flex-column justify-content-start col-12">
                <h2 className="header-text p-2 ps-3 m-0">Dashboard</h2>
            </div>
            <div className="dashboard d-flex flex-row justify-content-evenly ">

                <div className=" first-column d-flex flex-column justify-content-between">
                    <div className="left-dashboard">
                        <PendingApprovals></PendingApprovals>
                    </div>

                    <div className="left-dashboard">
                        <LastYearBookingInfo></LastYearBookingInfo>

                    </div>

                </div>
                <div className="right-dashboard">
                    <CuntryChart></CuntryChart>

                </div>


            </div>
        </div>

    )


}
export default Dashboard;