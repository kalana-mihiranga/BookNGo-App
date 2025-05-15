import React, { useState } from 'react';
import axios from 'axios';

function Usermanagemnet() {
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/event/search?name=${encodeURIComponent(searchTerm)}`);
            setEvents(res.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };
    const handleToggleStatus = async (eventId) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/event/${eventId}`);
            handleSearch(); // refresh your event list after status update
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Failed to update event status");
        }
    };

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
                {/* <li class="nav-item" role="presentation">
                    <button class="nav-link d-flex align-items-center" id="approved-tab" data-bs-toggle="tab" data-bs-target="#approved" type="button" role="tab" aria-controls="approved" aria-selected="false">
                        <i class="bi bi-check-circle me-2"></i>Business Management
                    </button>
                </li> */}
            </ul>

            <div class="tab-content p-3" id="eventManagementContent">
                <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                    <div className="container-fluid px-3 py-4">
                        {/* <div className="card-header bg-white border-bottom">
                            <h4 className="mb-0">Manage Events</h4>
                        </div> */}
                        <div className="card-body">
                            <div className="mb-4">
                                <label htmlFor="searchEvent" className="form-label">Search Event by Event Name</label>
                                <div className="input-group w-50">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="searchEvent"
                                        placeholder="Enter Event ID"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-primary" type="button" onClick={handleSearch}>
                                        <i className="bi bi-search me-1"></i> Search
                                    </button>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Event ID</th>
                                            <th>Event Name</th>
                                            <th>Business Name</th>
                                            <th>Location</th>
                                            <th>Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.length > 0 ? (
                                            events.map((event) => (
                                                <tr key={event.id}>
                                                    <td>{event.id}</td>
                                                    <td>{event.name}</td>
                                                    <td>{event.business?.user?.name || 'N/A'}</td>
                                                    <td>{event.location}</td>
                                                    <td>
                                                        <span className={`badge ${event.status ? 'bg-success' : 'bg-secondary'}`}>
                                                            {event.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <td className="text-center">
                                                                <div className="d-flex justify-content-center gap-2">
                                                                    <button
                                                                        className={`btn btn-sm ${event.status ? 'btn-warning' : 'btn-success'}`}
                                                                        onClick={() => handleToggleStatus(event.id)}
                                                                    >
                                                                        <i className={`bi ${event.status ? 'bi-slash-circle' : 'bi-check-circle'} me-1`}></i>
                                                                        {event.status ? 'Deactivate' : 'Activate'}
                                                                    </button>
                                                                </div>
                                                            </td>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6" className="text-center text-muted">No events found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Usermanagemnet;