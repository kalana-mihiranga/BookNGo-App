import "../../styles/admin/Dashboard.css";
import LastYearBookingInfo from "./LastYearBookingInfo";
import PendingApprovals from "./PendingApproval";
import CuntryChart from "./CountyChart";

function Dashboard() {
  return (
    <div className="dashboard d-flex flex-row justify-content-evenly ">
      <div className=" first-column d-flex flex-column justify-content-between">
        <div className="left-dashboard">
          <PendingApprovals></PendingApprovals>
        </div>

        <div className="left-dashboard">
          <LastYearBookingInfo></LastYearBookingInfo>
        </div>
      </div>
      <div className="right-dashboard">
        <CuntryChart></CuntryChart>
      </div>
    </div>
  );
}
export default Dashboard;
