import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../index.css'
import EmployeeDepartmentChart from "./EmployeeDepartmentChart";
import { SalaryChart } from "./SalaryChart";




export const HomePage = () => {

    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);
    const [recentEmployee, setRecentEmployee] = useState(null);
    const [latestEmployee, setLatestEmployee] = useState(null)

    const [departmentsWithoutEmployees, setDepartmentsWithoutEmployees] = useState([]);
    const [mostDepartments, setMostDepartments] = useState([]);

    // const [salaryPercentages, setSalaryPercentages] = useState([]);

    



    useEffect(() => {
        const getData = async () => {
            try {
                const [employeeRes, countriesResp, departmentsResp, citiesRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/employees'),
                    axios.get('http://127.0.0.1:8000/api/countries'),
                    axios.get('http://127.0.0.1:8000/api/departments'),
                    axios.get('http://127.0.0.1:8000/api/cities'),
                ])

                const employees = employeeRes.data;
                const latestEmployee = employeeRes.data

                setData(employeeRes.data)
                setCountries(countriesResp.data)
                setDepartments(departmentsResp.data.departments)
                setCities(citiesRes.data)

                const noEmployeesDepartments = departmentsResp.data.departments.filter(department =>
                    department.employees.length === 0
                );
                setDepartmentsWithoutEmployees(noEmployeesDepartments);

                const muchEmployeesInDeparment = departmentsResp.data.departments.filter(department => department.employees.length >= 2)
                setMostDepartments(muchEmployeesInDeparment)

                if (employees.length > 0) {
                    const sortedEmployees = employees.sort((a, b) => new Date(b.date_hired) - new Date(a.date_hired));
                    setRecentEmployee(sortedEmployees[0]);

                }

                if (latestEmployee.length > 0) {
                    const sortedEmployees = employees.sort((a, b) => new Date(a.date_hired) - new Date(b.date_hired));
                    setLatestEmployee(sortedEmployees[0]);
                }

                // const employeesWithSalaryAbove2 = employees.filter(employee => employee.salary > 2);
                // setSalaryPercentages(employeesWithSalaryAbove2);





            }
            catch (error) {
                console.log(error)
            }
        }


        getData()
    }, [])






    return (
        <div className="w-full flex justify-center bg-gray-100 min-h-screen ">
            <div className="max-w-3xl w-full px-4">

                <div className="mt-12 xl:mt-8 py-5 px-2 items-center">
                    <h1 className="text-3xl font-bold text-gray-800 uppercase">System Manage</h1>
                </div>

                <div className="bg-red rounded-lg flex gap-10 py-10 items-center shadow-lg justify-center flex-wrap md:flex-nowrap">
                    <div className="text-center ">
                        <div className="p-3 inline-flex bg-green-200 rounded-lg"></div>
                        <p className="text-lg font-bold text-gray-600 mb-2">Total employees</p>
                        <span className="font-bold text-lg text-gray-900">{data.length ? data.length : '0'}</span>
                    </div>
                    <div className="text-center">
                        <div className="p-3 inline-flex bg-indigo-200 rounded-lg"></div>
                        <p className="text-lg font-bold text-gray-600 mb-2">Total countries</p>
                        <span className="font-bold text-lg text-gray-900">{countries.length ? countries.length : '0'}</span>
                    </div>
                    <div className="text-center">
                        <div className="p-3 inline-flex bg-orange-200 rounded-lg"></div>
                        <p className="text-lg font-bold text-gray-600 mb-2">Total departments</p>
                        <span className="font-bold text-lg text-gray-900">{departments.length ? departments.length : '0'}</span>
                    </div>
                    <div className="text-center">
                        <div className="p-3 inline-flex bg-red-200 rounded-lg"></div>
                        <p className="text-lg font-bold text-gray-600 mb-2">Different cities</p>
                        <span className="font-bold text-lg text-gray-900">{cities.length ? cities.length : '0'}</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-4 flex-wrap sm:flex-nowrap ">

                    <div className="w-full ">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Most Recent Employee</h2>
                        {recentEmployee ? (
                            <div className="py-6 px-6 bg-white rounded-lg shadow ">
                                <p className="text-lg font-bold text-gray-600 uppercase mb-2">{recentEmployee.first_name} {recentEmployee.last_name}</p>
                                <p className="text-gray-500">Hired on: <span className="font-bold text-blue-600">{new Date(recentEmployee.date_hired).toLocaleDateString()}</span></p>
                                <p className="text-gray-500">Country: <span className="font-bold text-blue-600">{recentEmployee.country.name}</span></p>
                                <p className="text-gray-500">Department: <span className="font-bold text-blue-600">{recentEmployee.department.name}</span></p>
                            </div>
                        ) : (
                            <p>No employees available.</p>
                        )}
                    </div>

                    <div className="w-full ">
                        <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Most Oldest Employee</h2>
                        {latestEmployee ? (
                            <div className="py-6 px-6 bg-white rounded-lg shadow ">
                                <p className="text-lg font-bold uppercase mb-2 text-gray-600">{latestEmployee.first_name} {latestEmployee.last_name}</p>
                                <p className="text-gray-500">Hired on: <span className="font-bold text-blue-600">{new Date(latestEmployee.date_hired).toLocaleDateString()}</span></p>
                                <p className="text-gray-500">Country: <span className="font-bold text-blue-600">{latestEmployee.country.name}</span></p>
                                <p className="text-gray-500">Department: <span className="font-bold text-blue-600">{latestEmployee.department.name}</span></p>
                            </div>
                        ) : (
                            <p>No employees available.</p>
                        )}
                    </div>


                </div>

                <div className="mt-6 flex gap-4 flex-wrap sm:flex-nowrap ">

                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Departments w/m employees</h2>
                        {mostDepartments.length >= 2 ? (
                            <div className="py-6 px-6 bg-white rounded-lg shadow ">
                                {mostDepartments.map(department => (
                                    <ul>
                                        <li className="text-blue-600 font-bold" key={department.id}>{department.name}</li>
                                    </ul>
                                ))}
                            </div>
                        ) : (
                            <p className="py-6 px-6 bg-white rounded-lg shadow font-medium text-gray-500">No employees available.</p>
                        )}
                    </div>


                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Departments w/ no employees</h2>
                        {departmentsWithoutEmployees.length > 0 ? (
                            <div className="py-6 px-6 bg-white rounded-lg shadow ">
                                {departmentsWithoutEmployees.map(department => (
                                    <ul>
                                        <li className="text-blue-600 font-bold" key={department.id}>{department.name}</li>
                                    </ul>
                                ))}
                            </div>
                        ) : (

                            <p className="py-6 px-6 bg-white rounded-lg shadow font-medium text-gray-500">All departments had employees.</p>
                        )}
                    </div>


                </div>

                <div className="mt-5 bg-white rounded-lg shadow">
                    <EmployeeDepartmentChart />
                </div>

        <div className="mt-5 mb-5 bg-white rounded-lg shadow">
                    <SalaryChart />
                </div>
            </div>

        </div>
    );
}