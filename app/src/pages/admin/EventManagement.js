import "../../styles/admin/EventManagement.css";

function EventManagement() {
    return (
        <div class="container m-0 p-0 ">
            <ul class="nav nav-tabs custom-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        <i class="bi bi-house-door-fill"></i> Pending Approval
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        <i class="bi bi-person-circle"></i> Approved History
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                        <i class="bi bi-envelope-fill"></i> Contact
                    </button>
                </li>
            </ul>

            <div class="tab-content ps-3" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Organizer</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Music Festival</td>
                                <td>John Doe</td>
                                <td>2025-04-15</td>
                                <td>Central Park</td>
                                <td>
                                    <button class="btn btn-success btn-sm">
                                        <i class="bi bi-check-lg"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Food Expo</td>
                                <td>Jane Smith</td>
                                <td>2025-05-20</td>
                                <td>Downtown Hall</td>
                                <td>
                                    <button class="btn btn-success btn-sm">
                                        <i class="bi bi-check-lg"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Profile content goes here...</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Contact content goes here...</div>
            </div>



        </div>

    )
}
export default EventManagement;