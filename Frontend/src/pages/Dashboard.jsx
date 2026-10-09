
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardReport } from "../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await getDashboardReport();
                setData(response.data);
                setError("");
            } catch (err) {
                console.error("Dashboard loading error:", err);
                setError(
                    "Unable to load dashboard. Check whether the backend is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const cards = data ? [
        {
            title: "Total Employees",
            value: data.totalEmployees,
            color: "#1d5fa7",
            path: "/employees"
        },
        {
            title: "Active Employees",
            value: data.activeEmployees,
            color: "#16875b",
            path: "/employees"
        },
        {
            title: "Inactive Employees",
            value: data.inactiveEmployees,
            color: "#64748b",
            path: "/employees"
        },
        {
            title: "Present Records",
            value: data.presentCount,
            color: "#0891b2",
            path: "/attendance"
        },
        {
            title: "Absent Records",
            value: data.absentCount,
            color: "#dc5252",
            path: "/attendance"
        },
        {
            title: "Late Records",
            value: data.lateCount,
            color: "#d97706",
            path: "/attendance"
        },
        {
            title: "Leave Requests",
            value: data.totalLeaveRequests,
            color: "#7c3aed",
            path: "/leave-requests"
        },
        {
            title: "Pending Leave Requests",
            value: data.pendingLeaveRequests,
            color: "#ca8a04",
            path: "/leave-requests"
        },
        {
            title: "Overtime Records",
            value: data.totalOvertimeRecords,
            color: "#0f766e",
            path: "/overtime"
        }
    ] : [];

    return (
        <div style={{
            padding: "30px",
            minHeight: "100vh",
            backgroundColor: "#f5f7fb"
        }}>
            <div style={{ marginBottom: "28px" }}>
                <h2 style={{ margin: "0 0 8px", color: "#0f2747" }}>
                    HR Dashboard
                </h2>

                <p style={{ margin: 0, color: "#64748b" }}>
                    Overview of employees, attendance, leave and overtime.
                </p>
            </div>

            {loading && <p>Loading dashboard...</p>}

            {error && (
                <div style={{
                    padding: "15px",
                    backgroundColor: "#fee2e2",
                    color: "#991b1b",
                    borderRadius: "8px",
                    marginBottom: "20px"
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && data && (
                <>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px"
                    }}>
                        {cards.map((card) => (
                            <Link
                                key={card.title}
                                to={card.path}
                                style={{ textDecoration: "none" }}
                            >
                                <div style={{
                                    backgroundColor: "white",
                                    padding: "22px",
                                    borderRadius: "10px",
                                    borderLeft: `5px solid ${card.color}`,
                                    boxShadow:
                                        "0 2px 8px rgba(0,0,0,0.05)"
                                }}>
                                    <p style={{
                                        margin: "0 0 12px",
                                        color: "#64748b",
                                        fontSize: "14px"
                                    }}>
                                        {card.title}
                                    </p>

                                    <h2 style={{
                                        margin: 0,
                                        color: "#0f2747",
                                        fontSize: "30px"
                                    }}>
                                        {card.value ?? 0}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div style={{
                        marginTop: "25px",
                        backgroundColor: "white",
                        padding: "24px",
                        borderRadius: "10px"
                    }}>
                        <h3 style={{ marginTop: 0, color: "#0f2747" }}>
                            Quick Access
                        </h3>

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px"
                        }}>
                            <Link to="/employees">Manage Employees</Link>
                            <Link to="/departments">Manage Departments</Link>
                            <Link to="/employee-types">
                                Manage Employee Types
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;