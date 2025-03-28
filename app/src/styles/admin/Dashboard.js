import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionsChart from "../Session/Session";
import "./Dashboard.css"
import BookingCount from "../BookingCount/BookingCount";
import PendingApprovals from "../PendingApproval/PendingApproval";

function Dashboard() {
    return (
        <div className="dashboard d-flex flex-column">
            <div>
                <PendingApprovals></PendingApprovals>
            </div>

            <div className="left-dashboard">
                <SessionsChart></SessionsChart>

            </div>
            <div className="right-dashboard booking-count">
                <BookingCount></BookingCount>

            </div>


        </div>

    )


}
export default Dashboard;