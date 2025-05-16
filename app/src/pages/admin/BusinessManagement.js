import React, { useState } from 'react';
import axios from 'axios';

function BusinessManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [businesses, setBusinesses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/business/search?name=${encodeURIComponent(searchTerm)}`);
            setBusinesses(res.data);
        } catch (err) {
            console.error('Error fetching businesses:', err);
        }
    };

    const openConfirmationModal = (business) => {
        setSelectedBusiness(business);
        setShowModal(true);
    };

    const confirmToggleStatus = async () => {
        if (!selectedBusiness) return;

        try {
            await axios.put(`http://localhost:5000/api/admin/business/${selectedBusiness.id}`);
            setShowModal(false);
            setSelectedBusiness(null);
            handleSearch(); // Refresh list
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to update business status');
        }
    };

    return (
        <div className="container-fluid px-0">
            <ul className="nav nav-tabs px-3 pt-2">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active d-flex align-items-center">
                        <i className="bi bi-building me-2"></i>Business Management
                    </button>
                </li>
            </ul>

            <div className="tab-content p-3">
                <div className="container-fluid px-3 py-4">
                    <div className="card-body">
                        <div className="mb-4">
                            <label htmlFor="searchBusiness" className="form-label">Search Business by Name</label>
                            <div className="input-group w-50">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="searchBusiness"
                                    placeholder="Enter Business Name"
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
                                        <th>Business ID</th>
                                        <th>Created Date</th>
                                        <th>Business Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businesses.length > 0 ? (
                                        businesses.map((business) => (
                                            <tr key={business.id}>
                                                <td>{business.id}</td>
                                                <td>{business.user?.createdAt || 'N/A'}</td>
                                                <td>{business.user?.name || 'N/A'}</td>
                                                <td>{business.user?.email || 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${business.status ? 'bg-success' : 'bg-secondary'}`}>
                                                        {business.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className={`btn btn-sm ${business.status ? 'btn-warning' : 'btn-success'}`}
                                                        onClick={() => openConfirmationModal(business)}
                                                    >
                                                        <i className={`bi ${business.status ? 'bi-slash-circle' : 'bi-check-circle'} me-1`}></i>
                                                        {business.status ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">No businesses found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {selectedBusiness && (
                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Action</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to <strong>{selectedBusiness.status ? 'deactivate' : 'activate'}</strong> the business <strong>{selectedBusiness.user?.name}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button
                                    className={`btn ${selectedBusiness.status ? 'btn-danger' : 'btn-success'}`}
                                    onClick={confirmToggleStatus}
                                >
                                    Yes, {selectedBusiness.status ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BusinessManagement;
