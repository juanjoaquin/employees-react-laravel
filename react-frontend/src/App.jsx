import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllEmpleados } from "./Empleados/AllEmpleados";
import { CreateEmployee } from "./Empleados/CreateEmployee";
import { Navbar } from "./Navbar/Navbar";
import { EditEmployee } from "./Empleados/EditEmployee";
import { CreateCountry } from "./components/Country/CreateCountry";
import { Country } from "./components/Country/Country";
import { EditCountry } from "./components/Country/EditCountry";
import { Department } from "./components/Department/Department";
import { EditDepartment } from "./components/Department/EditDepartment";
import { EmployeeDepartmentEdit } from "./components/Department/EmployeeDepartmentEdit";
import { CreateDepartment } from "./components/Department/CreateDepartment";
import { City } from "./components/City/City";
import { CreateCity } from "./components/City/CreateCity";
import { EditCity } from "./components/City/EditCity";
import { EmployeeCityEdit } from "./components/City/EmployeeCityEdit";
import { NotFound } from "./components/NotFound/NotFound";
import { HomePage } from "./components/HomePage/HomePage";
import { State } from "./components/State/State";
import { EditState } from "./components/State/EditState";
import { CreateState } from "./components/State/CreateState";
import { EmployeeEditCountry } from "./components/Country/EmployeeEditCountry";




function App() {

    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/employees" element={<AllEmpleados />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            
            <Route path="/countries" element={<Country />} />
            <Route path="/create-country" element={<CreateCountry />} />
            <Route path="/edit-country/:id" element={<EditCountry />} />
            <Route path="/countries/update-country-employee/:id" element={<EmployeeEditCountry />} />

            <Route path="/departments" element={<Department />} />
            <Route path="/edit-department/:id" element={<EditDepartment />} />
            <Route path="/create-department" element={<CreateDepartment />} />
            <Route path="/departments/edit-employee-department/:id" element={<EmployeeDepartmentEdit />} />

            <Route path="/cities" element={<City />} />
            <Route path="/create-city" element={<CreateCity />} />
            <Route path="/edit-city/:id" element={<EditCity />} />
            <Route path="/cities/edit-employee-city/:id" element={<EmployeeCityEdit />} />

            <Route path="/states" element={<State />} />
            <Route path="/states/:id" element={<EditState />} />
            <Route path="/create-state" element={<CreateState />} />
            <Route path="/edit-state/:id" element={<EditState />} />

            <Route path="*" element={<NotFound />} />
            
            </Routes>
        </BrowserRouter>
    );
}

export default App;
