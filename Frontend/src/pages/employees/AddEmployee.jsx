import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createEmployee,
    getDepartments,
    getEmployeeTypes
} from "../../services/api";

function AddEmployee() {

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

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Load departments and employee types
    useEffect(() => {
        loadDropdownData();
    }, []);

    const loadDropdownData = async () => {

        try {

            const departmentResponse = await getDepartments();
            const employeeTypeResponse = await getEmployeeTypes();

            setDepartments(departmentResponse.data);
            setEmployeeTypes(employeeTypeResponse.data);

        } catch (error) {

            console.error(
                "Error loading dropdown data:",
                error
            );

            setError(
                "Unable to load departments or employee types."
            );
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

    // Submit employee
    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSaving(true);

        try {

            await createEmployee(formData);

            alert("Employee added successfully.");

            navigate("/employees");

        } catch (error) {

            console.error(
                "Error creating employee:",
                error
            );

            setError(
                "Failed to create employee. Please check the backend."
            );

        } finally {

            setSaving(false);
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h2>Add Employee</h2>

            <p>
                Enter the employee information below.
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
                        placeholder="EMP001"
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
                        placeholder="Kamal Perera"
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
                        placeholder="employee@example.com"
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
                        placeholder="0712345678"
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
                        placeholder="Software Developer"
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
                        placeholder="Colombo"
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
                        placeholder="Manager Name"
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
                    {saving ? "Saving..." : "Save Employee"}
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

export default AddEmployee;