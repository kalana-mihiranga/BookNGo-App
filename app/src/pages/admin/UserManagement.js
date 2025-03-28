function Usermanagemnet() {
    return (
        <div class="container-fluid px-0">
            <div class="card p-0">
                <div class="card-body p-0">
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
                        Event Management
                        </div>

                        <div class="tab-pane fade" id="approved" role="tabpanel" aria-labelledby="approved-tab">
                        Business Management
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );

}
export default Usermanagemnet;