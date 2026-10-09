import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// ===============================
// Employee APIs
// ===============================

export const getEmployees = () => {
    return axios.get(`${API_BASE_URL}/employees`);
};

export const getEmployeeById = (id) => {
    return axios.get(`${API_BASE_URL}/employees/${id}`);
};

export const createEmployee = (employee) => {
    return axios.post(`${API_BASE_URL}/employees`, employee);
};

export const updateEmployee = (id, employee) => {
    return axios.put(`${API_BASE_URL}/employees/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${API_BASE_URL}/employees/${id}`);
};


// ===============================
// Employee Type APIs
// ===============================

export const getEmployeeTypes = () => {
    return axios.get(`${API_BASE_URL}/employee-types`);
};


// ===============================
// Department APIs
// ===============================

export const getDepartments = () => {
    return axios.get(`${API_BASE_URL}/departments`);
};


// ===============================
// Authentication APIs
// ===============================

export const loginUser = (loginData) => {
    return axios.post(`${API_BASE_URL}/auth/login`, loginData);
};

export const registerUser = (userData) => {
    return axios.post(`${API_BASE_URL}/auth/register`, userData);
};
export const createDepartment = (department) => {
    return axios.post(
        `${API_BASE_URL}/departments`,
        department
    );
};

export const updateDepartment = (id, department) => {
    return axios.put(
        `${API_BASE_URL}/departments/${id}`,
        department
    );
};

// ===============================
// Employee Type APIs
// ===============================

export const getEmployeeTypes = () => {
    return axios.get(`${API_BASE_URL}/employee-types`);
};

export const createEmployeeType = (employeeType) => {
    return axios.post(
        `${API_BASE_URL}/employee-types`,
        employeeType
    );
};

export const updateEmployeeType = (id, employeeType) => {
    return axios.put(
        `${API_BASE_URL}/employee-types/${id}`,
        employeeType
    );
};

export const deleteEmployeeType = (id) => {
    return axios.delete(
        `${API_BASE_URL}/employee-types/${id}`
    );
};

// ===============================
// HR Dashboard API
// ===============================

export const getDashboardReport = () => {
    return axios.get(`${API_BASE_URL}/reports/dashboard`);
};


 // ===============================
 // Leave Type APIs
 // ===============================

export const getLeaveTypes = () => {
    return axios.get(`${API_BASE_URL}/leave-types`);
};

export const createLeaveType = (leaveType) => {
    return axios.post(`${API_BASE_URL}/leave-types`, leaveType);
};

export const updateLeaveType = (id, leaveType) => {
    return axios.put(`${API_BASE_URL}/leave-types/${id}`, leaveType);
};

export const deleteLeaveType = (id) => {
    return axios.delete(`${API_BASE_URL}/leave-types/${id}`);
};


 // ===============================
// Leave Policy APIs
// ===============================

export const getLeavePolicies = () => {
    return axios.get(`${API_BASE_URL}/leave-policies`);
};

export const createLeavePolicy = (policy) => {
    return axios.post(`${API_BASE_URL}/leave-policies`, policy);
};

export const updateLeavePolicy = (id, policy) => {
    return axios.put(`${API_BASE_URL}/leave-policies/${id}`, policy);
};

export const deleteLeavePolicy = (id) => {
    return axios.delete(`${API_BASE_URL}/leave-policies/${id}`);
};


 // ===============================
// Leave Request APIs
// ===============================

export const getLeaveRequests = () => {
    return axios.get(`${API_BASE_URL}/leave-requests`);
};

export const createLeaveRequest = (request) => {
    return axios.post(`${API_BASE_URL}/leave-requests`, request);
};

export const updateLeaveRequest = (id, request) => {
    return axios.put(`${API_BASE_URL}/leave-requests/${id}`, request);
};

export const deleteLeaveRequest = (id) => {
    return axios.delete(`${API_BASE_URL}/leave-requests/${id}`);
};


 // ===============================
// Attendance APIs
// ===============================

export const getAttendanceRecords = () => {
    return axios.get(`${API_BASE_URL}/attendance`);
};

export const createAttendanceRecord = (attendance) => {
    return axios.post(`${API_BASE_URL}/attendance`, attendance);
};

export const updateAttendanceRecord = (id, attendance) => {
    return axios.put(`${API_BASE_URL}/attendance/${id}`, attendance);
};

export const deleteAttendanceRecord = (id) => {
    return axios.delete(`${API_BASE_URL}/attendance/${id}`);
};


 // ===============================
// Work Schedule APIs
// ===============================

export const getWorkSchedules = () => {
    return axios.get(`${API_BASE_URL}/work-schedules`);
};

export const createWorkSchedule = (schedule) => {
    return axios.post(`${API_BASE_URL}/work-schedules`, schedule);
};

export const updateWorkSchedule = (id, schedule) => {
    return axios.put(`${API_BASE_URL}/work-schedules/${id}`, schedule);
};

export const deleteWorkSchedule = (id) => {
    return axios.delete(`${API_BASE_URL}/work-schedules/${id}`);
};


 // ===============================
// Holiday APIs
// ===============================

export const getHolidays = () => {
    return axios.get(`${API_BASE_URL}/holidays`);
};

export const createHoliday = (holiday) => {
    return axios.post(`${API_BASE_URL}/holidays`, holiday);
};

export const updateHoliday = (id, holiday) => {
    return axios.put(`${API_BASE_URL}/holidays/${id}`, holiday);
};

export const deleteHoliday = (id) => {
    return axios.delete(`${API_BASE_URL}/holidays/${id}`);
};


// Overtime Management API
export const getOvertimeRecords = () =>
  axios.get(`${API_BASE_URL}/overtime`);

export const createOvertimeRecord = (overtime) =>
  axios.post(`${API_BASE_URL}/overtime`, overtime);

export const updateOvertimeRecord = (id, overtime) =>
  axios.put(`${API_BASE_URL}/overtime/${id}`, overtime);

export const deleteOvertimeRecord = (id) =>
  axios.delete(`${API_BASE_URL}/overtime/${id}`);


export const getAttendanceCorrections = () =>
  axios.get(`${API_BASE_URL}/attendance-corrections`);

export const createAttendanceCorrection = (correction) =>
  axios.post(`${API_BASE_URL}/attendance-corrections`, correction);

export const updateAttendanceCorrection = (id, correction) =>
  axios.put(
    `${API_BASE_URL}/attendance-corrections/${id}`,
    correction
  );

export const deleteAttendanceCorrection = (id) =>
  axios.delete(`${API_BASE_URL}/attendance-corrections/${id}`);