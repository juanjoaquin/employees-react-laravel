
import React from "react";
import { Link } from "react-router-dom";



export const DepartmentsList = ({ data }) => {

    return (
        <>
            {data.map((department) => (
                department.employees.length > 0 ? (
                    department.employees.map((employee) => (
                        <tr key={`${department.id}-${employee.id}`} className="bg-white shadow">
                            <td className="text-center py-10 px-14 border-gray-200">{employee.id}</td>
                            <td className="text-center py-10 px-14 border-gray-200">{department.name}</td>
                            <td className="text-center py-10 px-14 border-gray-200">{employee.first_name} {employee.last_name}</td>
                            {/* <td className="text-center py-10 px-14 border-gray-200">{department.employees.length}</td>  */}
                            <td className="text-center py-10 px-14 border-gray-200">
                                <Link className=" py-2 px-4 bg-blue-500 font-bold text-white hover:bg-blue-600   rounded-lg " to={`/departments/edit-employee-department/${employee.id}`}>
                                    
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr key={department.id} className="bg-white shadow">
                        <td className="text-center py-4 px-6 border-gray-200">{department.id}</td>
                        <td className="text-center py-4 px-6 border-gray-200">{department.name}</td>
                        <td className="text-center py-4 px-6 border-gray-200">No employees</td>
                        <td className="text-center py-4 px-6 border-gray-200">-</td>

                    </tr>
                )

            ))}
        </>
    );
};