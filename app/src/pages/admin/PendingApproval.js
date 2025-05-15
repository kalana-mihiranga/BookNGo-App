import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/admin/PendingApproval.css";
const BusinessAndUserStats = () => {
    // Data with growth percentages
    const statsData = {
        business: {
            active: { value: 120, growth: 12.5, trend: "up" },
            total: { value: 500, growth: 8.2, trend: "up" }
        },
        users: {
            active: { value: 320, growth: 18.3, trend: "up" },
            total: { value: 800, growth: 5.7, trend: "up" }
        },
        applications: {
            pending: { value: 18 }
        },
        complains: {
            count: { value: 4 }
        }
    };

    // Trend indicator component
    const TrendIndicator = ({ trend, value }) => (
        <span className={`badge rounded-pill bg-${trend === "up" ? "success" : "danger"}-subtle text-${trend === "up" ? "success" : "danger"} ms-2`}>
            <i className={`bi bi-arrow-${trend === "up" ? "up" : "down"}-right me-1`}></i>
            {value}%
        </span>
    );

    return (
        <div className="container-fluid px-4 py-3">
            <div className="d-flex justify-content-start  row g-6">
                {/* Active Businesses */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3 ">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                                    <i className="bi bi-building"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">Active Businesses</h6>
                            </div>

                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start mb-3">
                                <h3 className="tile-value mb-0 fw-bold">{statsData.business.active.value}</h3>
                                <span className="text-muted small ms-2">/ {statsData.business.total.value}</span>
                            </div>
                            <div className="progress mt-3">
                                <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: `${(statsData.business.active.value / statsData.business.total.value) * 100}%` }}
                                    aria-valuenow={statsData.business.active.value}
                                    aria-valuemin="0"
                                    aria-valuemax={statsData.business.total.value}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Pending Approval*/}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                                    <i className="bi bi-hourglass-split"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">Pending Approval</h6>
                            </div>

                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">{statsData.applications.pending.value}</h3>
                                {/* <span className="text-muted small ms-2">/ {statsData.applications.total.value}</span> */}
                            </div>

                        </div>
                    </div>
                </div>
                {/* User Issues */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                                    <i className="bi bi-chat-left-text"></i> {/* Changed to chat/speech bubble icon */}
                                </div>
                            </div>
                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">User Complains</h6>
                            </div>

                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">{statsData.complains.count.value}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Active Users */}
                <div className="business-tile col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card stat-card h-100 border-0 shadow-sm p-2">
                        <div className="card-body p-0 d-flex flex-column align-item-center">
                            <div className="d-flex justify-content-center align-items-start mb-3">
                                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                                    <i className="bi bi-person-check"></i>
                                </div>
                            </div>
                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h6 className="name-of-tile text-muted text-uppercase small fw-semibold mb-1">Active Users</h6>
                            </div>

                            <div className="d-flex align-items-end d-flex justify-content-center align-items-start">
                                <h3 className="tile-value mb-0 fw-bold">{statsData.business.active.value}</h3>
                                <span className="text-muted small ms-2">/ {statsData.business.total.value}</span>
                            </div>
                            <div className="progress mt-3" >
                                <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: `${(statsData.users.active.value / statsData.users.total.value) * 100}%` }}
                                    aria-valuenow={statsData.users.active.value}
                                    aria-valuemin="0"
                                    aria-valuemax={statsData.users.total.value}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BusinessAndUserStats;