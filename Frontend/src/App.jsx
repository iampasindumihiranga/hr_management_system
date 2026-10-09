
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import EditEmployee from "./pages/employees/EditEmployee";
import LeaveTypeList from "./pages/leaveTypes/LeaveTypeList";
import DepartmentList from "./pages/departments/DepartmentList";
import EmployeeTypeList from "./pages/employeeTypes/EmployeeTypeList";
import LeavePolicyList from "./pages/leavePolicies/LeavePolicyList";
import LeaveRequestList from "./pages/leaveRequests/LeaveRequestList";
import AttendanceList from "./pages/attendance/AttendanceList";
import WorkScheduleList from "./pages/workSchedules/WorkScheduleList";
import HolidayList from "./pages/holidays/HolidayList";
import OvertimeList from "./pages/overtime/OvertimeList";
import AttendanceCorrectionList from "./pages/attendanceCorrections/AttendanceCorrectionList";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees/add" element={<AddEmployee />} />
                    <Route
                        path="/employees/edit/:id"
                        element={<EditEmployee />}
                    />

                    <Route
                        path="/departments"
                        element={<DepartmentList />}
                    />

                    <Route
                        path="/employee-types"
                        element={<EmployeeTypeList />}
                    />

                    </Routes>

                    <Route path="/leave-types" 
                    element={<LeaveTypeList />} 
                    />

                    <Route path="/leave-policies"
                     element={<LeavePolicyList />} 
                    />

                    <Route path="/leave-requests"
                    element={<LeaveRequestList />}
                    />


                    <Route path="/attendance" 
                    element={<AttendanceList />} 
                    />


                    <Route path="/work-schedules" 
                    element={<WorkScheduleList />} 
                    />


                    <Route path="/holidays" 
                    element={<HolidayList />} 
                    />
                    
                    <Route path="/overtime" 
                    element={<OvertimeList />} 
                    />

                    <Route path="/attendance-corrections"
                    element={<AttendanceCorrectionList />}
                     />

            </Layout>
        </BrowserRouter>
    );
}

export default App;