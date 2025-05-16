import React, { useState } from 'react';
import axios from 'axios';

function Usermanagemnet() {
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSearch = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/event/search?name=${encodeURIComponent(
                    searchTerm
                )}`
            );
            setEvents(res.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    const openConfirmationModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const confirmToggleStatus = async () => {
        if (!selectedEvent) return;

        try {
            await axios.put(
                `http://localhost:5000/api/admin/event/${selectedEvent.id}`
            );
            setShowModal(false);
            setSelectedEvent(null);
            handleSearch(); // Refresh event list
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to update event status');
        }
    };

    return (
        <div className="container-fluid px-0">
            <ul
                className="nav nav-tabs px-3 pt-2"
                id="eventManagementTabs"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active d-flex align-items-center"
                        id="pending-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#pending"
                        type="button"
                        role="tab"
                        aria-controls="pending"
                        aria-selected="true"
                    >
                        <i className="bi bi-hourglass-split me-2"></i>Event Management
                    </button>
                </li>
            </ul>

            <div className="tab-content p-3" id="eventManagementContent">
                <div
                    className="tab-pane fade show active"
                    id="pending"
                    role="tabpanel"
                    aria-labelledby="pending-tab"
                >
                    <div className="container-fluid px-3 py-4">
                        <div className="card-body">
                            <div className="mb-4">
                                <label htmlFor="searchEvent" className="form-label">
                                    Search Event by Event Name
                                </label>
                                <div className="input-group w-50">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="searchEvent"
                                        placeholder="Enter Event Name"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleSearch}
                                    >
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
                                                        <span
                                                            className={`badge ${event.status ? 'bg-success' : 'bg-secondary'
                                                                }`}
                                                        >
                                                            {event.status ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <button
                                                                className={`btn btn-sm ${event.status
                                                                        ? 'btn-warning'
                                                                        : 'btn-success'
                                                                    }`}
                                                                onClick={() => openConfirmationModal(event)}
                                                            >
                                                                <i
                                                                    className={`bi ${event.status
                                                                            ? 'bi-slash-circle'
                                                                            : 'bi-check-circle'
                                                                        } me-1`}
                                                                ></i>
                                                                {event.status ? 'Deactivate' : 'Activate'}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted">
                                                    No events found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedEvent && (
                <div
                    className={`modal fade ${showModal ? 'show d-block' : ''}`}
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Action</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to{' '}
                                <strong>
                                    {selectedEvent.status ? 'deactivate' : 'activate'}
                                </strong>{' '}
                                the event <strong>{selectedEvent.name}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${selectedEvent.status ? 'btn-danger' : 'btn-success'
                                        }`}
                                    onClick={confirmToggleStatus}
                                >
                                    Yes, {selectedEvent.status ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usermanagemnet;
