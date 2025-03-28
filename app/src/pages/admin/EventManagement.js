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
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2025-04-15</td>
                                            <td>Hotel</td>
                                            <td>Araliya</td>
                                            <td>Nuwara Eliya</td>
                                            <td class="text-center">
                                                <button class="btn btn-outline-primary btn-sm" title="View Details" aria-label="View Music Festival details">
                                                    <i class="bi bi-eye-fill"></i>
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button class="btn btn-success btn-sm me-1" title="Approve" aria-label="Approve Music Festival">
                                                    <i class="bi bi-check-lg"></i>
                                                </button>
                                                <button class="btn btn-danger btn-sm" title="Reject" aria-label="Reject Music Festival">
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
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

                        <div class="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="approved-tab">
                            <div class="alert alert-info">
                                <i class="bi bi-info-circle-fill me-2"></i>No approved events found.
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventManagement;