
import { useEffect, useState } from "react";
import {
    getWorkSchedules,
    createWorkSchedule,
    updateWorkSchedule,
    deleteWorkSchedule
} from "../../services/api";

function WorkScheduleList() {
    const [schedules, setSchedules] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const emptyForm = {
        scheduleName: "",
        shiftType: "DAY",
        startTime: "08:00",
        endTime: "17:00",
        workingDays: "MONDAY-FRIDAY",
        breakMinutes: "60",
        status: "ACTIVE"
    };

    const [form, setForm] = useState(emptyForm);

    const loadSchedules = async () => {
        try {
            setLoading(true);
            const response = await getWorkSchedules();
            setSchedules(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load work schedules. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = () => {
        setForm({ ...emptyForm });
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const schedule = {
            ...form,
            breakMinutes: Number(form.breakMinutes)
        };

        try {
            if (editingId !== null) {
                await updateWorkSchedule(editingId, schedule);
            } else {
                await createWorkSchedule(schedule);
            }

            resetForm();
            await loadSchedules();
        } catch (err) {
            console.error(err);
            alert(
                "Unable to save schedule. Check the backend entity field names."
            );
        }
    };

    const handleEdit = (schedule) => {
        setEditingId(schedule.workScheduleId);
        setForm({
            scheduleName: schedule.scheduleName || "",
            shiftType: schedule.shiftType || "DAY",
            startTime: schedule.startTime || "08:00",
            endTime: schedule.endTime || "17:00",
            workingDays: schedule.workingDays || "MONDAY-FRIDAY",
            breakMinutes: String(schedule.breakMinutes ?? 60),
            status: schedule.status || "ACTIVE"
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this work schedule?")) {
            return;
        }

        try {
            await deleteWorkSchedule(id);
            if (editingId === id) resetForm();
            await loadSchedules();
        } catch (err) {
            console.error(err);
            alert("Unable to delete work schedule.");
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
            <h2 style={{ color: "#0f2747" }}>Work Schedule Management</h2>

            <p style={{ color: "#64748b" }}>
                Configure working hours, shifts, and scheduled working days.
            </p>

            {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "10px",
                marginBottom: "25px"
            }}>
                <h3>{editingId !== null ? "Edit Schedule" : "Create Schedule"}</h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px"
                }}>
                    <label>
                        Schedule Name *
                        <input
                            name="scheduleName"
                            value={form.scheduleName}
                            onChange={handleChange}
                            required
                            placeholder="Standard Office Shift"
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Shift Type
                        <select
                            name="shiftType"
                            value={form.shiftType}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="DAY">Day</option>
                            <option value="NIGHT">Night</option>
                            <option value="MORNING">Morning</option>
                            <option value="EVENING">Evening</option>
                            <option value="ROTATING">Rotating</option>
                        </select>
                    </label>

                    <label>
                        Start Time *
                        <input
                            type="time"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        End Time *
                        <input
                            type="time"
                            name="endTime"
                            value={form.endTime}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Working Days *
                        <select
                            name="workingDays"
                            value={form.workingDays}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        >
                            <option value="MONDAY-FRIDAY">Monday-Friday</option>
                            <option value="MONDAY-SATURDAY">Monday-Saturday</option>
                            <option value="ALL_DAYS">All Days</option>
                            <option value="ROTATING">Rotating Schedule</option>
                        </select>
                    </label>

                    <label>
                        Break (minutes)
                        <input
                            type="number"
                            name="breakMinutes"
                            value={form.breakMinutes}
                            onChange={handleChange}
                            min="0"
                            required
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
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </label>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={{
                        padding: "11px 18px",
                        backgroundColor: "#1d5fa7",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}>
                        {editingId !== null ? "Update Schedule" : "Save Schedule"}
                    </button>

                    {editingId !== null && (
                        <button
                            type="button"
                            onClick={resetForm}
                            style={{ marginLeft: "10px", padding: "11px 18px" }}
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
                <h3>Existing Schedules</h3>

                {loading ? (
                    <p>Loading schedules...</p>
                ) : schedules.length === 0 ? (
                    <p>No work schedules found.</p>
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
                                <th>Shift</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Working Days</th>
                                <th>Break (min)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {schedules.map((schedule) => (
                                <tr key={schedule.workScheduleId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{schedule.workScheduleId}</td>
                                    <td>{schedule.scheduleName}</td>
                                    <td>{schedule.shiftType}</td>
                                    <td>{schedule.startTime}</td>
                                    <td>{schedule.endTime}</td>
                                    <td>{schedule.workingDays}</td>
                                    <td>{schedule.breakMinutes}</td>
                                    <td>{schedule.status}</td>
                                    <td>
                                        <button onClick={() => handleEdit(schedule)}>
                                            Edit
                                        </button>
                                        {" "}
                                        <button onClick={() =>
                                            handleDelete(schedule.workScheduleId)
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

export default WorkScheduleList;