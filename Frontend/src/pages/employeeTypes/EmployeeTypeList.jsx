import { useEffect, useState } from "react";

import {
    getEmployeeTypes,
    createEmployeeType,
    updateEmployeeType,
    deleteEmployeeType
} from "../../services/api";

function EmployeeTypeList() {

    const [employeeTypes, setEmployeeTypes] = useState([]);

    const [typeName, setTypeName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("ACTIVE");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadEmployeeTypes();
    }, []);

    const loadEmployeeTypes = async () => {

        try {

            setLoading(true);

            const response = await getEmployeeTypes();

            setEmployeeTypes(response.data);
            setError("");

        } catch (error) {

            console.error(
                "Error loading employee types:",
                error
            );

            setError(
                "Unable to load employee types."
            );

        } finally {

            setLoading(false);

        }
    };

    const clearForm = () => {

        setTypeName("");
        setDescription("");
        setStatus("ACTIVE");
        setEditingId(null);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!typeName.trim()) {
            setError("Employee type name is required.");
            return;
        }

        try {

            setSaving(true);
            setError("");

            const employeeTypeData = {
                typeName,
                description,
                status
            };

            if (editingId) {

                await updateEmployeeType(
                    editingId,
                    employeeTypeData
                );

                alert(
                    "Employee type updated successfully."
                );

            } else {

                await createEmployeeType(
                    employeeTypeData
                );

                alert(
                    "Employee type added successfully."
                );

            }

            clearForm();

            await loadEmployeeTypes();

        } catch (error) {

            console.error(
                "Error saving employee type:",
                error
            );

            setError(
                "Failed to save employee type."
            );

        } finally {

            setSaving(false);

        }
    };

    const handleEdit = (employeeType) => {

        setEditingId(
            employeeType.employeeTypeId
        );

        setTypeName(
            employeeType.typeName || ""
        );

        setDescription(
            employeeType.description || ""
        );

        setStatus(
            employeeType.status || "ACTIVE"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee type?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteEmployeeType(id);

            setEmployeeTypes(
                employeeTypes.filter(
                    type =>
                        type.employeeTypeId !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting employee type:",
                error
            );

            alert(
                "Failed to delete employee type."
            );
        }
    };

    return (

        <div
            style={{
                padding: "30px",
                backgroundColor: "#f5f7fb",
                minHeight: "100vh"
            }}
        >

            {/* Header */}

            <div style={{ marginBottom: "25px" }}>

                <h2>
                    Employee Type Management
                </h2>

                <p style={{ color: "#666" }}>
                    Manage employee employment types.
                </p>

            </div>

            {/* Error */}

            {error && (

                <div
                    style={{
                        padding: "12px",
                        marginBottom: "20px",
                        color: "red",
                        backgroundColor: "#ffe6e6",
                        borderRadius: "6px"
                    }}
                >
                    {error}
                </div>

            )}

            {/* Form */}

            <div
                style={{
                    backgroundColor: "white",
                    padding: "25px",
                    borderRadius: "8px",
                    marginBottom: "25px"
                }}
            >

                <h3>
                    {editingId
                        ? "Edit Employee Type"
                        : "Add Employee Type"}
                </h3>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: "15px" }}>

                        <label>
                            Employee Type
                        </label>

                        <br />

                        <input
                            type="text"
                            value={typeName}
                            onChange={(event) =>
                                setTypeName(
                                    event.target.value
                                )
                            }
                            placeholder="Permanent"
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "5px"
                            }}
                        />

                    </div>

                    <div style={{ marginBottom: "15px" }}>

                        <label>
                            Description
                        </label>

                        <br />

                        <textarea
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            placeholder="Full-time permanent employee"
                            rows="3"
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginTop: "5px"
                            }}
                        />

                    </div>

                    <div style={{ marginBottom: "15px" }}>

                        <label>
                            Status
                        </label>

                        <br />

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(
                                    event.target.value
                                )
                            }
                            style={{
                                padding: "10px",
                                marginTop: "5px"
                            }}
                        >

                            <option value="ACTIVE">
                                ACTIVE
                            </option>

                            <option value="INACTIVE">
                                INACTIVE
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : editingId
                                ? "Update Employee Type"
                                : "Add Employee Type"}
                    </button>

                    {editingId && (
                        <>
                            {" "}

                            <button
                                type="button"
                                onClick={clearForm}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                </form>

            </div>

            {/* Employee Types Table */}

            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "auto"
                }}
            >

                <div style={{ padding: "20px" }}>

                    <h3>
                        Employee Types
                    </h3>

                </div>

                {loading ? (

                    <div style={{ padding: "20px" }}>
                        Loading employee types...
                    </div>

                ) : employeeTypes.length === 0 ? (

                    <div style={{ padding: "20px" }}>
                        No employee types found.
                    </div>

                ) : (

                    <table
                        width="100%"
                        cellPadding="12"
                        style={{
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    borderBottom:
                                        "1px solid #ddd",
                                    textAlign: "left"
                                }}
                            >

                                <th>ID</th>
                                <th>Type Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {employeeTypes.map(
                                (employeeType) => (

                                    <tr
                                        key={
                                            employeeType.employeeTypeId
                                        }
                                        style={{
                                            borderBottom:
                                                "1px solid #eee"
                                        }}
                                    >

                                        <td>
                                            {
                                                employeeType.employeeTypeId
                                            }
                                        </td>

                                        <td>
                                            <strong>
                                                {
                                                    employeeType.typeName
                                                }
                                            </strong>
                                        </td>

                                        <td>
                                            {
                                                employeeType.description ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                employeeType.status ||
                                                "-"
                                            }
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        employeeType
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        employeeType.employeeTypeId
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}

export default EmployeeTypeList;