
import { useEffect, useState } from "react";
import {
    getHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday
} from "../../services/api";

function HolidayList() {
    const emptyForm = {
        holidayName: "",
        holidayDate: "",
        holidayType: "PUBLIC",
        description: "",
        status: "ACTIVE"
    };

    const [holidays, setHolidays] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadHolidays = async () => {
        try {
            setLoading(true);
            const response = await getHolidays();
            setHolidays(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load holidays. Check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHolidays();
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

        try {
            if (editingId !== null) {
                await updateHoliday(editingId, form);
            } else {
                await createHoliday(form);
            }

            resetForm();
            await loadHolidays();
        } catch (err) {
            console.error(err);
            alert("Unable to save holiday. Check the backend field names.");
        }
    };

    const handleEdit = (holiday) => {
        setEditingId(holiday.holidayId);
        setForm({
            holidayName: holiday.holidayName || "",
            holidayDate: holiday.holidayDate || "",
            holidayType: holiday.holidayType || "PUBLIC",
            description: holiday.description || "",
            status: holiday.status || "ACTIVE"
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this holiday?")) {
            return;
        }

        try {
            await deleteHoliday(id);
            if (editingId === id) resetForm();
            await loadHolidays();
        } catch (err) {
            console.error(err);
            alert("Unable to delete holiday.");
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
            <h2 style={{ color: "#0f2747" }}>Holiday Management</h2>
            <p style={{ color: "#64748b" }}>
                Manage public holidays and company holidays.
            </p>

            {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "10px",
                marginBottom: "25px"
            }}>
                <h3>{editingId !== null ? "Edit Holiday" : "Add Holiday"}</h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "16px"
                }}>
                    <label>
                        Holiday Name *
                        <input
                            name="holidayName"
                            value={form.holidayName}
                            onChange={handleChange}
                            required
                            placeholder="e.g. New Year's Day"
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Holiday Date *
                        <input
                            type="date"
                            name="holidayDate"
                            value={form.holidayDate}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </label>

                    <label>
                        Holiday Type *
                        <select
                            name="holidayType"
                            value={form.holidayType}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="PUBLIC">Public Holiday</option>
                            <option value="COMPANY">Company Holiday</option>
                            <option value="RELIGIOUS">Religious Holiday</option>
                            <option value="OPTIONAL">Optional Holiday</option>
                        </select>
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

                    <label style={{ gridColumn: "1 / -1" }}>
                        Description
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Optional details"
                            style={inputStyle}
                        />
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
                        {editingId !== null ? "Update Holiday" : "Save Holiday"}
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
                <h3>Holiday List</h3>

                {loading ? (
                    <p>Loading holidays...</p>
                ) : holidays.length === 0 ? (
                    <p>No holidays found.</p>
                ) : (
                    <table width="100%" cellPadding="12"
                        style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{
                                textAlign: "left",
                                borderBottom: "2px solid #e2e8f0"
                            }}>
                                <th>ID</th>
                                <th>Holiday</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {holidays.map((holiday) => (
                                <tr key={holiday.holidayId}
                                    style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td>{holiday.holidayId}</td>
                                    <td>{holiday.holidayName}</td>
                                    <td>{holiday.holidayDate}</td>
                                    <td>{holiday.holidayType}</td>
                                    <td>{holiday.description || "-"}</td>
                                    <td>{holiday.status || "-"}</td>
                                    <td>
                                        <button onClick={() => handleEdit(holiday)}>
                                            Edit
                                        </button>
                                        {" "}
                                        <button onClick={() =>
                                            handleDelete(holiday.holidayId)
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

export default HolidayList;