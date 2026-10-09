
import { useEffect, useState } from "react";
import {
  getOvertimeRecords,
  createOvertimeRecord,
  updateOvertimeRecord,
  deleteOvertimeRecord,
} from "../../services/api";

const styles = {
  page: {
    padding: "24px",
    background: "#f5f7fb",
    minHeight: "100vh",
    color: "#0f2747",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(15,39,71,0.06)",
  },
  input: {
    padding: "10px",
    border: "1px solid #d8deea",
    borderRadius: "7px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    background: "#1d5fa7",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
  cell: {
    padding: "12px",
    borderBottom: "1px solid #e8edf4",
    textAlign: "left",
  },
};

const emptyForm = {
  employeeId: "",
  overtimeDate: "",
  startTime: "",
  endTime: "",
  hours: "",
  reason: "",
};

export default function OvertimeList() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadRecords() {
    try {
      setLoading(true);
      setError("");
      const response = await getOvertimeRecords();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load overtime records. Check the backend API."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (Number(form.hours) <= 0) {
      setError("Overtime hours must be greater than zero.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createOvertimeRecord({
        ...form,
        employeeId: Number(form.employeeId),
        hours: Number(form.hours),
        status: "PENDING",
      });

      setForm(emptyForm);
      await loadRecords();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not create the overtime record. Check the backend field names."
      );
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(record, status) {
    const id = record.overtimeId ?? record.id;

    if (id == null) {
      setError("Could not find the overtime record ID.");
      return;
    }

    try {
      setError("");
      await updateOvertimeRecord(id, { ...record, status });
      await loadRecords();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update the overtime status."
      );
    }
  }

  async function handleDelete(record) {
    const id = record.overtimeId ?? record.id;

    if (id == null) {
      setError("Could not find the overtime record ID.");
      return;
    }

    if (!window.confirm("Delete this overtime record?")) return;

    try {
      setError("");
      await deleteOvertimeRecord(id);
      await loadRecords();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not delete the overtime record."
      );
    }
  }

  const filteredRecords = records.filter((record) => {
    const status = String(record.status || "PENDING").toUpperCase();
    return filter === "ALL" || status === filter;
  });

  return (
    <div style={styles.page}>
      <h1>Overtime Management</h1>
      <p>Manage employee overtime records and approvals.</p>

      {error && (
        <div
          style={{
            ...styles.card,
            color: "#b42318",
            borderLeft: "4px solid #b42318",
          }}
        >
          {error}
        </div>
      )}

      <div style={styles.card}>
        <h2>Add Overtime Record</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
          }}
        >
          <input
            style={styles.input}
            name="employeeId"
            type="number"
            min="1"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="overtimeDate"
            type="date"
            value={form.overtimeDate}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="hours"
            type="number"
            min="0.25"
            step="0.25"
            placeholder="Overtime hours"
            value={form.hours}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="reason"
            placeholder="Reason for overtime"
            value={form.reason}
            onChange={handleChange}
            required
          />

          <button style={styles.button} disabled={saving} type="submit">
            {saving ? "Saving..." : "Add Overtime"}
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <h2>Overtime Records</h2>

          <select
            style={{ ...styles.input, width: "180px" }}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="ALL">All Records</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p>Loading overtime records...</p>
        ) : filteredRecords.length === 0 ? (
          <p>No overtime records found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {[
                    "Employee ID",
                    "Date",
                    "Start",
                    "End",
                    "Hours",
                    "Reason",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th key={heading} style={styles.cell}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => {
                  const status = String(
                    record.status || "PENDING"
                  ).toUpperCase();

                  return (
                    <tr key={record.overtimeId ?? record.id}>
                      <td style={styles.cell}>
                        {record.employeeId ??
                          record.employee?.employeeId ??
                          "-"}
                      </td>
                      <td style={styles.cell}>
                        {record.overtimeDate ?? record.date ?? "-"}
                      </td>
                      <td style={styles.cell}>
                        {record.startTime ?? "-"}
                      </td>
                      <td style={styles.cell}>
                        {record.endTime ?? "-"}
                      </td>
                      <td style={styles.cell}>
                        {record.hours ?? record.overtimeHours ?? "-"}
                      </td>
                      <td style={styles.cell}>{record.reason ?? "-"}</td>
                      <td style={styles.cell}>{status}</td>
                      <td style={styles.cell}>
                        {status === "PENDING" && (
                          <>
                            <button
                              style={{
                                ...styles.button,
                                background: "#16803c",
                                marginRight: "6px",
                              }}
                              onClick={() =>
                                changeStatus(record, "APPROVED")
                              }
                            >
                              Approve
                            </button>

                            <button
                              style={{
                                ...styles.button,
                                background: "#b42318",
                              }}
                              onClick={() =>
                                changeStatus(record, "REJECTED")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          style={{
                            ...styles.button,
                            background: "#64748b",
                            marginLeft: "6px",
                          }}
                          onClick={() => handleDelete(record)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}