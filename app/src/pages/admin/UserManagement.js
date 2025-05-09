function Usermanagemnet() {
    return (
        <div class="container-fluid px-0">
            {/* <div class="card p-0"> */}
            {/* <div class="card-body p-0"> */}
            <ul class="nav nav-tabs px-3 pt-2" id="eventManagementTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active d-flex align-items-center" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="true">
                        <i class="bi bi-hourglass-split me-2"></i>Event Management
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-flex align-items-center" id="approved-tab" data-bs-toggle="tab" data-bs-target="#approved" type="button" role="tab" aria-controls="approved" aria-selected="false">
                        <i class="bi bi-check-circle me-2"></i>Business Management
                    </button>
                </li>
            </ul>

            <div class="tab-content p-3" id="eventManagementContent">
                <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">



                    <div className="container-fluid px-3 py-4">
                        {/* <div className="card shadow-sm"> */}
                        <div className="card-header bg-white border-bottom">
                            <h4 className="mb-0">Manage Events</h4>
                        </div>
                        <div className="card-body">
                            {/* Search Section */}
                            <div className="mb-4">
                                <label htmlFor="searchEvent" className="form-label">Search Event by Event ID</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="searchEvent"
                                        placeholder="Enter Event ID"
                                    />
                                    <button className="btn btn-primary" type="button">
                                        <i className="bi bi-search me-1"></i> Search
                                    </button>
                                </div>
                            </div>

                            {/* Event Table */}
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Event ID</th>
                                            <th>Event Name</th>
                                            <th>Organizer</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Example Row */}
                                        <tr>
                                            <td>#E1024</td>
                                            <td>Hotel Launch</td>
                                            <td>Araliya Group</td>
                                            <td>Colombo</td>
                                            <td><span className="badge bg-success">Active</span></td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-warning btn-sm d-flex align-items-center">
                                                        <i className="bi bi-slash-circle me-1"></i> Deactivate
                                                    </button>
                                                    <button className="btn btn-danger btn-sm d-flex align-items-center">
                                                        <i className="bi bi-trash3 me-1"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>#E1056</td>
                                            <td>Beach Party</td>
                                            <td>Ocean Vibes</td>
                                            <td>Galle</td>
                                            <td><span className="badge bg-secondary">Inactive</span></td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-success btn-sm d-flex align-items-center">
                                                        <i className="bi bi-check-circle me-1"></i> Activate
                                                    </button>
                                                    <button className="btn btn-danger btn-sm d-flex align-items-center">
                                                        <i className="bi bi-trash3 me-1"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination if needed */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>












                </div>

                <div class="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="approved-tab">
                    Business Management
                </div>


            </div>
            {/* </div> */}
            {/* </div> */}
        </div>
    );

}
export default Usermanagemnet;