import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getEmployeeById,
    updateEmployee,
    getDepartments,
    getEmployeeTypes
} from "../../services/api";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);

    const [formData, setFormData] = useState({
        employeeCode: "",
        employeeName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        gender: "",
        dateOfBirth: "",
        joiningDate: "",
        employmentType: "",
        location: "",
        manager: "",
        status: "ACTIVE"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load employee and dropdown data
    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                employeeResponse,
                departmentResponse,
                employeeTypeResponse
            ] = await Promise.all([
                getEmployeeById(id),
                getDepartments(),
                getEmployeeTypes()
            ]);

            const employee = employeeResponse.data;

            setFormData({
                employeeCode: employee.employeeCode || "",
                employeeName: employee.employeeName || "",
                email: employee.email || "",
                phone: employee.phone || "",
                department: employee.department || "",
                designation: employee.designation || "",
                gender: employee.gender || "",
                dateOfBirth: employee.dateOfBirth || "",
                joiningDate: employee.joiningDate || "",
                employmentType: employee.employmentType || "",
                location: employee.location || "",
                manager: employee.manager || "",
                status: employee.status || "ACTIVE"
            });

            setDepartments(departmentResponse.data);
            setEmployeeTypes(employeeTypeResponse.data);

            setError("");

        } catch (error) {

            console.error(
                "Error loading employee:",
                error
            );

            setError(
                "Unable to load employee information."
            );

        } finally {

            setLoading(false);

        }
    };

    // Handle input changes
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Update employee
    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSaving(true);

        try {

            await updateEmployee(id, formData);

            alert("Employee updated successfully.");

            navigate("/employees");

        } catch (error) {

            console.error(
                "Error updating employee:",
                error
            );

            setError(
                "Failed to update employee."
            );

        } finally {

            setSaving(false);

        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Edit Employee</h2>
                <p>Loading employee...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "30px" }}>

            <h2>Edit Employee</h2>

            <p>
                Update the employee information below.
            </p>

            {error && (
                <div
                    style={{
                        color: "red",
                        marginBottom: "15px"
                    }}
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {/* Employee Code */}
                <div>
                    <label>Employee Code</label>
                    <br />

                    <input
                        type="text"
                        name="employeeCode"
                        value={formData.employeeCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                {/* Employee Name */}
                <div>
                    <label>Employee Name</label>
                    <br />

                    <input
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                {/* Email */}
                <div>
                    <label>Email</label>
                    <br />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Phone */}
                <div>
                    <label>Phone</label>
                    <br />

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Department */}
                <div>
                    <label>Department</label>
                    <br />

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.departmentId}
                                value={department.departmentName}
                            >
                                {department.departmentName}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                {/* Designation */}
                <div>
                    <label>Designation</label>
                    <br />

                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Gender */}
                <div>
                    <label>Gender</label>
                    <br />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <br />

                {/* Date of Birth */}
                <div>
                    <label>Date of Birth</label>
                    <br />

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Joining Date */}
                <div>
                    <label>Joining Date</label>
                    <br />

                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                {/* Employment Type */}
                <div>
                    <label>Employment Type</label>
                    <br />

                    <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Employee Type
                        </option>

                        {employeeTypes.map((type) => (
                            <option
                                key={type.employeeTypeId}
                                value={type.typeName}
                            >
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                {/* Location */}
                <div>
                    <label>Location</label>
                    <br />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Manager */}
                <div>
                    <label>Manager</label>
                    <br />

                    <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                    />
                </div>

                <br />

                {/* Status */}
                <div>
                    <label>Status</label>
                    <br />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">
                            ACTIVE
                        </option>

                        <option value="INACTIVE">
                            INACTIVE
                        </option>
                    </select>
                </div>

                <br />

                {/* Buttons */}
                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Updating..." : "Update Employee"}
                </button>

                {" "}

                <button
                    type="button"
                    onClick={() => navigate("/employees")}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default EditEmployee;