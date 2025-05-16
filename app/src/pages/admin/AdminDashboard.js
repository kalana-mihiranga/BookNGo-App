import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../styles/admin/AdminDashboard.css";
import { useSnackbar } from "notistack";
import { logout } from "../../../src/utils/logout";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    logout(navigate, enqueueSnackbar);
  };


  return (
    <div className="admin-dashboard col">
      <div className="sbar p-0">
        <div className="sidebar-header">
          <div className="m-3 me-0 d-flex flex-row justify-content-start align-items-center">
            <img
              className="profile-pic m-0 ms-0"
              src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile"
            />
            <div class="d-flex justify-content-end">
              <div>
                <p className="user-name pb-0 mb-0">Admin</p>
                <p className="email pb-0 mb-0">adminuser@gmail.com</p>
              </div>
              <button onClick={handleLogout} className="logout logout  m-0 p-2 pe-3 ps-3 ms-4 ">
                <i className="bi bi-box-arrow-right fs-4"></i>
              </button>
            </div>
          </div>

        </div>

        <ul className="sidebar-menu pt-0 mt-0">
          <li>
            <button
              className={`sidebar-menu-link ${isActive("/admin/dashboard") ? "active" : ""}`}
              onClick={() => navigate("/admin/dashboard")}
            >
              <i className="bi bi-house-door-fill"></i> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`sidebar-menu-link ${isActive("/admin/approval") ? "active" : ""}`}
              onClick={() => navigate("/admin/approval")}
            >
              <i className="bi bi-calendar-event"></i> Approval
            </button>
          </li>
          <li>
            <button
              className={`sidebar-menu-link ${isActive("/admin/event-management") ? "active" : ""}`}
              onClick={() => navigate("/admin/event-management")}
            >
              <i className="bi bi-calendar-range"></i> Event Management
            </button>
          </li>
          <li>
            <button
              className={`sidebar-menu-link ${isActive("/admin/business-management") ? "active" : ""}`}
              onClick={() => navigate("/admin/business-management")}
            >
              <i className="bi bi-building"></i> Business Management
            </button>
          </li>
        </ul>
      </div>

      <div className="dashboard-content p-0 ">
        <div className="header-right d-flex flex-column justify-content-start col-12">
          <div className="topic d-flex justify-content-start col-12 ">
            {/* <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">
                      <i class="bi bi-house-door-fill fs-1"></i> Home
                    </a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
              </nav> */}
          </div>
          <div className="col-12">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
