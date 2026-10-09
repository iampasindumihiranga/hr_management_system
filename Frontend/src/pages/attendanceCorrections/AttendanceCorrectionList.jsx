
import { useEffect, useState } from "react";
import {
  getAttendanceCorrections,
  updateAttendanceCorrection,
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
  },
  button: {
    padding: "9px 12px",
    color: "#fff",
    background: "#1d5fa7",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "6px",
  },
  cell: {
    padding: "12px",
    borderBottom: "1px solid #e8edf4",
    textAlign: "left",
  },
};

export default function AttendanceCorrectionList() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCorrections() {
    try {
      setLoading(true);
      setError("");

      const response = await getAttendanceCorrections();
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load attendance correction requests."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCorrections();
  }, []);

  async function updateStatus(record, status) {
    const id =
      record.correctionId ??
      record.attendanceCorrectionId ??
      record.id;

    if (id == null) {
      setError("Correction record ID was not found.");
      return;
    }

    try {
      setError("");

      await updateAttendanceCorrection(id, {
        ...record,
        status,
      });

      await loadCorrections();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update the correction request."
      );
    }
  }

  const filteredRecords = records.filter((record) => {
    const status = String(record.status || "PENDING").toUpperCase();
    return filter === "ALL" || status === filter;
  });

  return (
    <div style={styles.page}>
      <h1>Attendance Corrections</h1>
      <p>Review employee requests to correct attendance records.</p>

      {error && (
        <div style={{ ...styles.card, color: "#b42318" }}>
          {error}
        </div>
      )}

      <div style={styles.card}>
        <label htmlFor="statusFilter">Filter by status: </label>{" "}
        <select
          id="statusFilter"
          style={styles.input}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="ALL">All Requests</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button
          style={{ ...styles.button, marginLeft: "12px" }}
          onClick={loadCorrections}
        >
          Refresh
        </button>
      </div>

      <div style={styles.card}>
        {loading ? (
          <p>Loading correction requests...</p>
        ) : filteredRecords.length === 0 ? (
          <p>No attendance correction requests found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  {[
                    "Employee",
                    "Attendance Date",
                    "Requested Check-in",
                    "Requested Check-out",
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
                    <tr
                      key={
                        record.correctionId ??
                        record.attendanceCorrectionId ??
                        record.id
                      }
                    >
                      <td style={styles.cell}>
                        {record.employeeName ??
                          record.employee?.name ??
                          record.employeeId ??
                          "-"}
                      </td>

                      <td style={styles.cell}>
                        {record.attendanceDate ??
                          record.date ??
                          "-"}
                      </td>

                      <td style={styles.cell}>
                        {record.requestedCheckIn ??
                          record.newCheckIn ??
                          "-"}
                      </td>

                      <td style={styles.cell}>
                        {record.requestedCheckOut ??
                          record.newCheckOut ??
                          "-"}
                      </td>

                      <td style={styles.cell}>
                        {record.reason ?? "-"}
                      </td>

                      <td style={styles.cell}>{status}</td>

                      <td style={styles.cell}>
                        {status === "PENDING" && (
                          <>
                            <button
                              style={{
                                ...styles.button,
                                background: "#16803c",
                              }}
                              onClick={() =>
                                updateStatus(record, "APPROVED")
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
                                updateStatus(record, "REJECTED")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
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