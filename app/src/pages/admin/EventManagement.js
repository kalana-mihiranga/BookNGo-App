import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/EventManagement.css";

function EventManagement() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [actionType, setActionType] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchPendingApprovals();
    fetchApprovedEvents();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/approvals/pending-approval");
      setPendingEvents(res.data);
    } catch (error) {
      console.error("Error fetching pending approvals", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/approvals/history");
      setApprovedEvents(res.data);
    } catch (error) {
      console.error("Error fetching approved events", error);
    }
  };

  const handleApprovalUpdate = async () => {
    if (!selectedApproval) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/approvals/${selectedApproval.id}`, {
        status: actionType === 'approve' ? 'APPROVED' : 'REJECTED',
        authorizedBy: 'admin@bookngo.com'
      });
      fetchPendingApprovals();
    } catch (error) {
      console.error("Error updating approval status:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="card-body p-0">
        <ul className="nav nav-tabs px-3 pt-2" id="eventManagementTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active d-flex align-items-center" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="true">
              <i className="bi bi-hourglass-split me-2"></i>Pending Approval
              <span className="badge bg-secondary ms-2">{pendingEvents.length}</span>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
              id="approved-tab"
              data-bs-toggle="tab"
              data-bs-target="#approved"
              type="button"
              role="tab"
              onClick={() => {
                setActiveTab('approved');
                fetchApprovedEvents(); 
              }}
            >
              <i className="bi bi-check-circle me-2"></i>Approved History
            </button>
          </li>
        </ul>

        <div className="tab-content p-3" id="eventManagementContent">
          <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Created Date</th>
                    <th>Event Name</th>
                    <th>Category</th>
                    <th>Action</th>
                    <th className="text-center">Details</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6">Loading...</td></tr>
                  ) : pendingEvents.length === 0 ? (
                    <tr><td colSpan="6">No pending events.</td></tr>
                  ) : (
                    pendingEvents.map((approval) => (
                      <tr key={approval.id}>
                        <td>{new Date(approval.createdAt).toLocaleDateString()}</td>
                        <td>{approval.event?.name || 'N/A'}</td>
                        <td>{approval?.approvalCategory || 'N/A'}</td>
                        <td>{approval?.action || 'N/A'}</td>
                        <td className="text-center">
                          <button className="btn btn-primary btn-sm">View</button>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                setSelectedApproval(approval);
                                setActionType('approve');
                                setShowConfirmModal(true);
                              }}
                            >Approve</button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setSelectedApproval(approval);
                                setActionType('reject');
                                setShowConfirmModal(true);
                              }}
                            >Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="approved-tab">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Event Name</th>
                    <th>Category</th>
                    <th>Action</th>
                    <th>Auth By</th>
                    <th>Auth Date</th>
                    <th className="text-center">Details</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedEvents.map((event) => (
                    <tr key={event.id}>
                      <td>
                        {new Date(event.createdAt).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        })}
                      </td>
                      <td>{event.event?.name || 'N/A'}</td>
                      <td>{event?.approvalCategory || 'N/A'}</td>
                      <td>{event?.action || 'N/A'}</td>
                      <td>{event?.authorizedBy || 'N/A'}</td>
                      <td>
                        {new Date(event.authorizedAt).toLocaleString('en-GB', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true,
                        })}
                      </td>
                      <td className="text-center">
                        <button className="btn btn-primary btn-sm">View</button>
                      </td>
                      <td className="text-center">
                        <span className={`badge p-2 ${event.status === 'APPROVED' ? 'bg-success' : 'bg-danger'}`}>
                          {event.status === 'APPROVED' ? 'Approved' : 'Rejected'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showConfirmModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to {actionType} this request?
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                  <button
                    className={`btn btn-${actionType === 'approve' ? 'success' : 'danger'}`}
                    onClick={handleApprovalUpdate}
                  >
                    Yes, {actionType}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventManagement;