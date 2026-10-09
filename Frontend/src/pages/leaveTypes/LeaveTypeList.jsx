
import { useEffect, useState } from "react";
import {
    getLeaveTypes,
    createLeaveType,
    updateLeaveType,
    deleteLeaveType
} from "../../services/api";

function LeaveTypeList() {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveTypeName, setLeaveTypeName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadLeaveTypes();
    }, []);

    const loadLeaveTypes = async () => {
        try {
            setLoading(true);
            const response = await getLeaveTypes();
            setLeaveTypes(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load leave types. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setLeaveTypeName("");
        setDescription("");
        setStatus("ACTIVE");
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const leaveType = {
            leaveTypeName,
            description,
            status
        };

        try {
            if (editingId !== null) {
                await updateLeaveType(editingId, leaveType);
            } else {
                await createLeaveType(leaveType);
            }

            resetForm();
            await loadLeaveTypes();
        } catch (err) {
            console.error(err);
            alert(
                "Unable to save leave type. Check the backend field names and API."
            );
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.leaveTypeId);
        setLeaveTypeName(item.leaveTypeName || "");
        setDescription(item.description || "");
        setStatus(item.status || "ACTIVE");
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this leave type?")) {
            return;
        }

        try {
            await deleteLeaveType(id);
            await loadLeaveTypes();

            if (editingId === id) {
                resetForm();
            }
        } catch (err) {
            console.error(err);
            alert("Unable to delete leave type.");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        boxSizing: "border-box"
    };

    return (
        <div style={{
            padding: "30px",
            minHeight: "100vh",
            backgroundColor: "#f5f7fb"
        }}>
            <h2 style={{ color: "#0f2747" }}>Leave Type Management</h2>
            <p style={{ color: "#64748b" }}>
                Create and manage the leave types available to employees.
            </p>

            {error && (
                <p style={{ color: "#b91c1c" }}>{error}</p>
            )}

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "white",
                    padding: "24px",
                    borderRadius: "10px",
                    marginBottom: "25px"
                }}
            >
                <h3>{editingId !== null ? "Edit Leave Type" : "Add Leave Type"}</h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px"
                }}>
                    <label>
                        Leave Type Name *
                        <input
                            required
                            value={leaveTypeName}
                            onChange={(e) => setLeaveTypeName(e.target.value)}
                            placeholder="e.g. Annual Leave"
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Description
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Status
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </label>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={{
                        padding: "10px 18px",
                        backgroundColor: "#1d5fa7",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}>
                        {editingId !== null ? "Update Leave Type" : "Add Leave Type"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            style={{ marginLeft: "10px", padding: "10px 18px" }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                overflowX: "auto"
            }}>
                <h3>Leave Types</h3>

                {loading ? (
                    <p>Loading leave types...</p>
                ) : leaveTypes.length === 0 ? (
                    <p>No leave types found.</p>
                ) : (
                    <table width="100%" cellPadding="12"
                        style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{
                                textAlign: "left",
                                borderBottom: "2px solid #e2e8f0"
                            }}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaveTypes.map((item) => (
                                <tr key={item.leaveTypeId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{item.leaveTypeId}</td>
                                    <td>{item.leaveTypeName}</td>
                                    <td>{item.description || "-"}</td>
                                    <td>{item.status || "-"}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>
                                            Edit
                                        </button>
                                        {" "}
                                        <button onClick={() =>
                                            handleDelete(item.leaveTypeId)
                                        }>
                                            Delete
                                        </button>
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

export default LeaveTypeList;