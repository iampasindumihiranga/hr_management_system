import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getEmployees,
    deleteEmployee
} from "../../services/api";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load employees when page opens
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);

            const response = await getEmployees();

            setEmployees(response.data);
            setError("");

        } catch (error) {
            console.error("Error loading employees:", error);
            setError("Unable to load employees.");
        } finally {
            setLoading(false);
        }
    };

    // Delete employee
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteEmployee(id);

            // Remove deleted employee from the table
            setEmployees(
                employees.filter(employee => employee.employeeId !== id)
            );

        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            {/* Page Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px"
                }}
            >
                <div>
                    <h2>Employee Management</h2>
                    <p>Manage all employees in the organization.</p>
                </div>

                <Link to="/employees/add">
                    <button>
                        + Add Employee
                    </button>
                </Link>
            </div>

            {/* Error */}
            {error && (
                <div style={{ color: "red", marginBottom: "15px" }}>
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <p>Loading employees...</p>
            ) : employees.length === 0 ? (

                <p>No employees found.</p>

            ) : (

                <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    width="100%"
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Employment Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.map((employee) => (

                            <tr key={employee.employeeId}>

                                <td>
                                    {employee.employeeId}
                                </td>

                                <td>
                                    {employee.employeeCode}
                                </td>

                                <td>
                                    {employee.employeeName}
                                </td>

                                <td>
                                    {employee.email || "-"}
                                </td>

                                <td>
                                    {employee.department || "-"}
                                </td>

                                <td>
                                    {employee.designation || "-"}
                                </td>

                                <td>
                                    {employee.employmentType || "-"}
                                </td>

                                <td>
                                    {employee.status || "-"}
                                </td>

                                <td>

                                    <Link
                                        to={`/employees/edit/${employee.employeeId}`}
                                    >
                                        <button>
                                            Edit
                                        </button>
                                    </Link>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            handleDelete(employee.employeeId)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>
                </table>
            )}

        </div>
    );
}

export default EmployeeList;