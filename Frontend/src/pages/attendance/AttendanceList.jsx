
import { useEffect, useState } from "react";
import {
    getAttendanceRecords,
    createAttendanceRecord
} from "../../services/api";

function AttendanceList() {
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        employeeId: "",
        date: new Date().toLocaleDateString("en-CA"),
        checkIn: "",
        checkOut: "",
        status: "PRESENT",
        remarks: ""
    });

    const loadRecords = async () => {
        try {
            setLoading(true);
            const response = await getAttendanceRecords();
            setRecords(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load attendance records. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecords();
    }, []);

    const handleFormChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await createAttendanceRecord({
                ...form,
                employeeId: Number(form.employeeId)
            });

            setForm({
                employeeId: "",
                date: new Date().toLocaleDateString("en-CA"),
                checkIn: "",
                checkOut: "",
                status: "PRESENT",
                remarks: ""
            });

            await loadRecords();
            alert("Attendance recorded successfully.");
        } catch (err) {
            console.error(err);
            alert(
                "Unable to record attendance. Check the backend field names and API."
            );
        }
    };

    const filteredRecords = records.filter((record) => {
        const text = search.toLowerCase();

        const matchesSearch = [
            record.employeeName,
            record.employeeCode,
            record.employeeId,
            record.status,
            record.remarks
        ].some(value =>
            String(value ?? "").toLowerCase().includes(text)
        );

        const matchesStatus =
            statusFilter === "ALL" ||
            String(record.status || "").toUpperCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
            <h2 style={{ color: "#0f2747" }}>Attendance Management</h2>
            <p style={{ color: "#64748b" }}>
                View employee attendance and record daily attendance.
            </p>

            {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "10px",
                marginBottom: "25px"
            }}>
                <h3>Record Attendance</h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px"
                }}>
                    <label>
                        Employee ID *
                        <input
                            type="number"
                            name="employeeId"
                            value={form.employeeId}
                            onChange={handleFormChange}
                            min="1"
                            required
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Date *
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleFormChange}
                            required
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Check-in
                        <input
                            type="time"
                            name="checkIn"
                            value={form.checkIn}
                            onChange={handleFormChange}
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Check-out
                        <input
                            type="time"
                            name="checkOut"
                            value={form.checkOut}
                            onChange={handleFormChange}
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Status *
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                            style={inputStyle}
                        >
                            <option value="PRESENT">Present</option>
                            <option value="ABSENT">Absent</option>
                            <option value="LATE">Late</option>
                            <option value="HALF_DAY">Half Day</option>
                            <option value="ON_LEAVE">On Leave</option>
                        </select>
                    </label>

                    <label>
                        Remarks
                        <input
                            name="remarks"
                            value={form.remarks}
                            onChange={handleFormChange}
                            placeholder="Optional notes"
                            style={inputStyle}
                        />
                    </label>
                </div>

                <button type="submit" style={{
                    marginTop: "20px",
                    padding: "11px 18px",
                    backgroundColor: "#1d5fa7",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}>
                    Save Attendance
                </button>
            </form>

            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                overflowX: "auto"
            }}>
                <h3>Attendance Records</h3>

                <div style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}>
                    <input
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        placeholder="Search employee or status..."
                        style={{ ...inputStyle, flex: 1, minWidth: "220px" }}
                    />

                    <select
                        value={statusFilter}
                        onChange={event => setStatusFilter(event.target.value)}
                        style={{ ...inputStyle, width: "180px" }}
                    >
                        <option value="ALL">All statuses</option>
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                        <option value="LATE">Late</option>
                        <option value="HALF_DAY">Half Day</option>
                        <option value="ON_LEAVE">On Leave</option>
                    </select>

                    <button type="button" onClick={loadRecords}>
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <p>Loading attendance...</p>
                ) : filteredRecords.length === 0 ? (
                    <p>No attendance records found.</p>
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
                                <th>Date</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr key={record.attendanceId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{record.attendanceId}</td>
                                    <td>
                                        {record.employeeName ||
                                         record.employeeCode ||
                                         record.employeeId ||
                                         "-"}
                                    </td>
                                    <td>{record.date || "-"}</td>
                                    <td>{record.checkIn || "-"}</td>
                                    <td>{record.checkOut || "-"}</td>
                                    <td>{record.status || "-"}</td>
                                    <td>{record.remarks || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AttendanceList;