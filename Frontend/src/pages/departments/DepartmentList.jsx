import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../services/api";

function DepartmentList() {

    const [departments, setDepartments] = useState([]);

    const [departmentName, setDepartmentName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("ACTIVE");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {

        try {

            setLoading(true);

            const response = await getDepartments();

            setDepartments(response.data);
            setError("");

        } catch (error) {

            console.error(error);

            setError("Unable to load departments.");

        } finally {

            setLoading(false);

        }
    };

    const clearForm = () => {

        setDepartmentName("");
        setDescription("");
        setStatus("ACTIVE");
        setEditingId(null);

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!departmentName.trim()) {
            setError("Department name is required.");
            return;
        }

        try {

            setSaving(true);
            setError("");

            const departmentData = {
                departmentName,
                description,
                status
            };

            if (editingId) {

                await updateDepartment(
                    editingId,
                    departmentData
                );

                alert("Department updated successfully.");

            } else {

                await createDepartment(
                    departmentData
                );

                alert("Department added successfully.");

            }

            clearForm();

            await loadDepartments();

        } catch (error) {

            console.error(error);

            setError(
                "Failed to save department."
            );

        } finally {

            setSaving(false);

        }
    };

    const handleEdit = (department) => {

        setEditingId(department.departmentId);

        setDepartmentName(
            department.departmentName || ""
        );

        setDescription(
            department.description || ""
        );

        setStatus(
            department.status || "ACTIVE"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDepartment(id);

            setDepartments(
                departments.filter(
                    department =>
                        department.departmentId !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete department."
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
                    Department Management
                </h2>

                <p style={{ color: "#666" }}>
                    Manage organization departments.
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

            {/* Department Form */}

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
                        ? "Edit Department"
                        : "Add Department"}
                </h3>

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: "15px" }}>

                        <label>
                            Department Name
                        </label>

                        <br />

                        <input
                            type="text"
                            value={departmentName}
                            onChange={(event) =>
                                setDepartmentName(
                                    event.target.value
                                )
                            }
                            placeholder="Human Resources"
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
                            placeholder="Department description"
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
                                ? "Update Department"
                                : "Add Department"}
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

            {/* Department Table */}

            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "auto"
                }}
            >

                <div style={{ padding: "20px" }}>

                    <h3>
                        Departments
                    </h3>

                </div>

                {loading ? (

                    <div style={{ padding: "20px" }}>
                        Loading departments...
                    </div>

                ) : departments.length === 0 ? (

                    <div style={{ padding: "20px" }}>
                        No departments found.
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
                                <th>Department Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {departments.map(
                                (department) => (

                                    <tr
                                        key={
                                            department.departmentId
                                        }
                                        style={{
                                            borderBottom:
                                                "1px solid #eee"
                                        }}
                                    >

                                        <td>
                                            {
                                                department.departmentId
                                            }
                                        </td>

                                        <td>
                                            <strong>
                                                {
                                                    department.departmentName
                                                }
                                            </strong>
                                        </td>

                                        <td>
                                            {
                                                department.description ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                department.status ||
                                                "-"
                                            }
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        department
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            {" "}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        department.departmentId
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

export default DepartmentList;