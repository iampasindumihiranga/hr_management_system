import { NavLink } from "react-router-dom";

function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Employees",
            path: "/employees"
        },
        {
            name: "Departments",
            path: "/departments"
        },
        {
            name: "Employee Types",
            path: "/employee-types"
            
        },
        {   name: "Leave Types", 
            path: "/leave-types" 

        },
        {  
            name: "Leave Policies", 
            path: "/leave-policies" 

        },
        {   name: "Leave Requests", 
            path: "/leave-requests" 

        },
        {   name: "Attendance",
            path: "/attendance" 

        },
        {   name: "Work Schedules", 
            path: "/work-schedules" 

        },
        {   name: "Holidays",
            path: "/holidays" 
        },
        {   name: "Overtime", 
            path: "/overtime" 

        },
        {   name: "Attendance Corrections", 
            path: "/attendance-corrections" 

        },
    ];

    return (
        <aside
            style={{
                width: "240px",
                minHeight: "100vh",
                backgroundColor: "#0f2747",
                color: "white",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >

            {/* Logo */}

            <div
                style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginBottom: "35px"
                }}
            >
                HRMS
            </div>

            {/* Navigation */}

            <nav>

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "12px 15px",
                            marginBottom: "8px",
                            borderRadius: "6px",
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: isActive
                                ? "#1d5fa7"
                                : "transparent"
                        })}
                    >
                        {item.name}
                    </NavLink>

                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;