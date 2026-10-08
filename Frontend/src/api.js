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