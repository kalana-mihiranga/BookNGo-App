import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/admin/PendingApproval.css";

const BusinessAndUserStats = () => {
    const [pendingCount, setPendingCount] = useState(0);
    const [businessCount, setBusinessCount] = useState(0);
    const [touristCount, setTouristCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);



    useEffect(() => {
        const fetchPendingCount = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/approvals/pending-count");
                const pending = res.data.pendingCount;
                setPendingCount(pending);
            } catch (err) {
                console.error("Failed to fetch pending approval count:", err);
            }
        };

        fetchPendingCount();
    }, []);

    useEffect(() => {
        const fetchBusinessCount = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/business/count");
                setBusinessCount(res.data.businessCount);
            } catch (err) {
                console.error("Failed to fetch business count:", err);
            }
        };

        fetchBusinessCount();
    }, []);
    useEffect(() => {
        const fetchTouristCount = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/tourist/count");
                setTouristCount(res.data.touristCount);
            } catch (err) {
                console.error("Failed to fetch tourist count", err);
            }
        };

        fetchTouristCount();
    }, []);


    useEffect(() => {
        const fetchEventCount = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/event/total");
                setEventCount(res.data.totalEvents);
            } catch (err) {
                console.error("Failed to fetch event count", err);
            }
        };

        fetchEventCount();
    }, []);


    return (
        <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-start row g-6">
                {/* Active Businesses */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                                    <i className="bi bi-building"></i>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">
                                    Total Businesses
                                </h6>
                            </div>
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <h3 className="tile-value mb-0 fw-bold">
                                    {businessCount}
                                </h3>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Approval */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                                    <i className="bi bi-hourglass-split"></i>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">
                                    Pending Approval
                                </h6>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">
                                    {pendingCount}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Events*/}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                                    <i className="bi bi-chat-left-text"></i>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">
                                    Total Events
                                </h6>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">
                                    {eventCount}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Tourist */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                                    <i className="bi bi-person-check"></i>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">
                                    Total Tourist
                                </h6>
                            </div>
                            <div className="d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">
                                    {touristCount}
                                </h3>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessAndUserStats;
