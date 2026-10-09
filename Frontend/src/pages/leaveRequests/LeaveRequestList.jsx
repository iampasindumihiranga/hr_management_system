
import { useEffect, useState } from "react";
import {
    getLeaveRequests,
    updateLeaveRequest
} from "../../services/api";

function LeaveRequestList() {
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadRequests = async () => {
        try {
            setLoading(true);
            const response = await getLeaveRequests();
            setRequests(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load leave requests. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleStatusChange = async (request, newStatus) => {
        const id = request.leaveRequestId;

        if (!window.confirm(`Change this request to ${newStatus}?`)) {
            return;
        }

        try {
            await updateLeaveRequest(id, {
                ...request,
                status: newStatus
            });

            await loadRequests();
        } catch (err) {
            console.error(err);
            alert("Unable to update the request status.");
        }
    };

    const filteredRequests = requests.filter((request) => {
        const searchText = search.toLowerCase();

        const matchesSearch = [
            request.employeeName,
            request.employeeCode,
            request.leaveType,
            request.reason
        ].some(value =>
            String(value || "").toLowerCase().includes(searchText)
        );

        const matchesStatus =
            statusFilter === "ALL" ||
            String(request.status || "").toUpperCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusStyle = (status) => {
        const value = String(status || "").toUpperCase();

        const colors = {
            PENDING: { background: "#fef3c7", color: "#92400e" },
            APPROVED: { background: "#dcfce7", color: "#166534" },
            REJECTED: { background: "#fee2e2", color: "#991b1b" }
        };

        return {
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "12px",
            backgroundColor: (colors[value] || {}).background || "#e2e8f0",
            color: (colors[value] || {}).color || "#334155"
        };
    };

    return (
        <div style={{
            padding: "30px",
            minHeight: "100vh",
            backgroundColor: "#f5f7fb"
        }}>
            <h2 style={{ color: "#0f2747" }}>
                Leave Request Management
            </h2>

            <p style={{ color: "#64748b" }}>
                Review employee leave requests and manage approvals.
            </p>

            {error && (
                <p style={{ color: "#b91c1c" }}>{error}</p>
            )}

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px"
            }}>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search employee, leave type, or reason..."
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        padding: "12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px"
                    }}
                />

                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    style={{
                        padding: "12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px"
                    }}
                >
                    <option value="ALL">All statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                overflowX: "auto"
            }}>
                {loading ? (
                    <p>Loading leave requests...</p>
                ) : filteredRequests.length === 0 ? (
                    <p>No leave requests found.</p>
                ) : (
                    <table width="100%" cellPadding="12"
                        style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{
                                textAlign: "left",
                                borderBottom: "2px solid #e2e8f0"
                            }}>
                                <th>ID</th>
                                <th>Employee</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRequests.map(request => (
                                <tr key={request.leaveRequestId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{request.leaveRequestId}</td>
                                    <td>
                                        {request.employeeName ||
                                         request.employeeCode ||
                                         request.employeeId ||
                                         "-"}
                                    </td>
                                    <td>{request.leaveType || "-"}</td>
                                    <td>{request.startDate || "-"}</td>
                                    <td>{request.endDate || "-"}</td>
                                    <td>{request.daysRequested ?? "-"}</td>
                                    <td>{request.reason || "-"}</td>
                                    <td>
                                        <span style={statusStyle(request.status)}>
                                            {request.status || "UNKNOWN"}
                                        </span>
                                    </td>
                                    <td>
                                        {String(request.status || "").toUpperCase() === "PENDING" ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(request, "APPROVED")
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                {" "}
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(request, "REJECTED")
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default LeaveRequestList;