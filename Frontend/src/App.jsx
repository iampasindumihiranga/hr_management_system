import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import EditEmployee from "./pages/employees/EditEmployee";

import DepartmentList from "./pages/departments/DepartmentList";
import EmployeeTypeList from "./pages/employeeTypes/EmployeeTypeList";

function App() {

    return (
        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route
                        path="/"
                        element={<EmployeeList />}
                    />

                    <Route
                        path="/employees"
                        element={<EmployeeList />}
                    />

                    <Route
                        path="/employees/add"
                        element={<AddEmployee />}
                    />

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

            </Layout>

        </BrowserRouter>
    );
}

export default App;