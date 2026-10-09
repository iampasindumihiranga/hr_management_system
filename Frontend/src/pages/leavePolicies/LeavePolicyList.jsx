
import { useEffect, useState } from "react";
import {
    getLeavePolicies,
    createLeavePolicy,
    updateLeavePolicy,
    deleteLeavePolicy
} from "../../services/api";

function LeavePolicyList() {
    const [policies, setPolicies] = useState([]);
    const [form, setForm] = useState({
        policyName: "",
        employeeType: "",
        leaveType: "",
        daysAllowed: "",
        description: "",
        status: "ACTIVE"
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPolicies = async () => {
        try {
            setLoading(true);
            const response = await getLeavePolicies();
            setPolicies(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load leave policies. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPolicies();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = () => {
        setForm({
            policyName: "",
            employeeType: "",
            leaveType: "",
            daysAllowed: "",
            description: "",
            status: "ACTIVE"
        });
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const policy = {
            ...form,
            daysAllowed: Number(form.daysAllowed)
        };

        try {
            if (editingId !== null) {
                await updateLeavePolicy(editingId, policy);
            } else {
                await createLeavePolicy(policy);
            }

            resetForm();
            await loadPolicies();
        } catch (err) {
            console.error(err);
            alert(
                "Unable to save policy. Check your backend entity field names."
            );
        }
    };

    const handleEdit = (policy) => {
        setEditingId(policy.leavePolicyId);
        setForm({
            policyName: policy.policyName || "",
            employeeType: policy.employeeType || "",
            leaveType: policy.leaveType || "",
            daysAllowed: policy.daysAllowed ?? "",
            description: policy.description || "",
            status: policy.status || "ACTIVE"
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this leave policy?")) {
            return;
        }

        try {
            await deleteLeavePolicy(id);
            if (editingId === id) resetForm();
            await loadPolicies();
        } catch (err) {
            console.error(err);
            alert("Unable to delete policy.");
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
            backgroundColor: "#f5f7fb",
            minHeight: "100vh"
        }}>
            <h2 style={{ color: "#0f2747" }}>Leave Policy Management</h2>
            <p style={{ color: "#64748b" }}>
                Configure leave allowances and eligibility rules.
            </p>

            {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "10px",
                marginBottom: "25px"
            }}>
                <h3>{editingId !== null ? "Edit Policy" : "Add Policy"}</h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px"
                }}>
                    <label>
                        Policy Name *
                        <input
                            name="policyName"
                            value={form.policyName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            placeholder="Annual Leave Policy"
                        />
                    </label>

                    <label>
                        Employee Type *
                        <select
                            name="employeeType"
                            value={form.employeeType}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select type</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                            <option value="Intern">Intern</option>
                            <option value="Shift Worker">Shift Worker</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </label>

                    <label>
                        Leave Type *
                        <select
                            name="leaveType"
                            value={form.leaveType}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select leave type</option>
                            <option value="Annual">Annual</option>
                            <option value="Casual">Casual</option>
                            <option value="Medical">Medical</option>
                            <option value="No-Pay">No-Pay</option>
                            <option value="Maternity">Maternity</option>
                        </select>
                    </label>

                    <label>
                        Allowed Days *
                        <input
                            type="number"
                            name="daysAllowed"
                            value={form.daysAllowed}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.5"
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Status
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </label>

                    <label>
                        Description
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Policy details"
                        />
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
                        {editingId !== null ? "Update Policy" : "Add Policy"}
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
                <h3>Existing Policies</h3>

                {loading ? (
                    <p>Loading policies...</p>
                ) : policies.length === 0 ? (
                    <p>No leave policies found.</p>
                ) : (
                    <table width="100%" cellPadding="12"
                        style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{
                                textAlign: "left",
                                borderBottom: "2px solid #e2e8f0"
                            }}>
                                <th>ID</th>
                                <th>Policy</th>
                                <th>Employee Type</th>
                                <th>Leave Type</th>
                                <th>Days Allowed</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {policies.map((policy) => (
                                <tr key={policy.leavePolicyId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{policy.leavePolicyId}</td>
                                    <td>{policy.policyName}</td>
                                    <td>{policy.employeeType}</td>
                                    <td>{policy.leaveType}</td>
                                    <td>{policy.daysAllowed}</td>
                                    <td>{policy.status}</td>
                                    <td>
                                        <button onClick={() => handleEdit(policy)}>
                                            Edit
                                        </button>
                                        {" "}
                                        <button onClick={() =>
                                            handleDelete(policy.leavePolicyId)
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

export default LeavePolicyList;