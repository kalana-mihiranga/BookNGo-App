import "../../styles/admin/EventManagement.css";

function EventManagement() {
    return (
        <div class="container-fluid px-0">
            <div class="card p-0">
                {/* <div class="card-header bg-white border-bottom">
                    <h2 class="h5 mb-0">Event Management Dashboard</h2>
                </div> */}

                <div class="card-body p-0">
                    <ul class="nav nav-tabs px-3 pt-2" id="eventManagementTabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active d-flex align-items-center" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="true">
                                <i class="bi bi-hourglass-split me-2"></i>Pending Approval
                                <span class="badge bg-secondary ms-2">6</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link d-flex align-items-center" id="approved-tab" data-bs-toggle="tab" data-bs-target="#approved" type="button" role="tab" aria-controls="approved" aria-selected="false">
                                <i class="bi bi-check-circle me-2"></i>Approved History
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content p-3" id="eventManagementContent">
                        <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col" class="w-15">Date</th>
                                            <th scope="col" class="w-25">Event Name</th>
                                            <th scope="col" class="w-20">Organizer</th>
                                            <th scope="col" class="w-20">Location</th>
                                            <th scope="col" class="w-10 text-center">Details</th>
                                            <th scope="col" class="w-10 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center ">
                                                <button class="btn btn-primary btn-sm mt-0" title="View Details" aria-label="View Music Festival details">
                                                    <i className="bi bi-eye pe-1"></i>View
                                                </button>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    <button className="btn btn-success btn-sm d-flex align-items-center mt-0">
                                                        <i className="bi bi-check-circle me-1"></i> Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-sm d-flex align-items-center mt-0">
                                                        <i className="bi bi-x-circle me-1"></i> Reject
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center ">
                                                <button class="btn btn-primary btn-sm mt-0" title="View Details" aria-label="View Music Festival details">
                                                    <i className="bi bi-eye pe-1"></i>View
                                                </button>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    <button className="btn btn-success btn-sm d-flex align-items-center mt-0">
                                                        <i className="bi bi-check-circle me-1"></i> Approve
                                                    </button>
                                                    <button className="btn btn-danger btn-sm d-flex align-items-center mt-0">
                                                        <i className="bi bi-x-circle me-1"></i> Reject
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination pagination-sm mb-0">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                        </li>
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="approved-tab">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="w-15">Date</th>
                                            <th scope="col" className="w-25">Event Name</th>
                                            <th scope="col" className="w-20">Organizer</th>
                                            <th scope="col" className="w-20">Location</th>
                                            <th scope="col" className="w-10 text-center">Details</th>
                                            <th scope="col" className="w-10 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2025-04-02</td>
                                            <td>Beach Party</td>
                                            <td>Club Tropic</td>
                                            <td>Galle</td>
                                            <td class="text-center ">
                                                <button class="btn btn-primary btn-sm mt-0" title="View Details" aria-label="View Music Festival details">
                                                    <i className="bi bi-eye pe-1"></i>View
                                                </button>
                                            </td>
                                            <td className="text-center align-middle">
                                                <span className="badge bg-success p-2">Approved</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-03-29</td>
                                            <td>Food Festival</td>
                                            <td>Ceylon Flavors</td>
                                            <td>Kandy</td>
                                            <td class="text-center ">
                                                <button class="btn btn-primary btn-sm mt-0" title="View Details" aria-label="View Music Festival details">
                                                    <i className="bi bi-eye pe-1"></i>View
                                                </button>
                                            </td>
                                            <td className="text-center align-middle">
                                                <span className="badge bg-success p-2">Approved</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventManagement;