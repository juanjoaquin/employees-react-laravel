import React from "react";
import { Link } from "react-router-dom";


export const CityList = ({ cities }) => {


    return (
        <>
            {cities.map((city) => (
                city.employees.length > 0 ? (
                    city.employees.map((employee) => (
                        <tr key={`${city.id}-${employee.id}`} className="bg-white shadow">
                            <td className="text-center py-10 px-14 border-gray-200">{employee.id}</td>
                            <td className="text-center py-10 px-14 border-gray-200">{city.name}</td>
                            <td className="text-center py-10 px-14 border-gray-200">{employee.first_name}</td>
                            
                            <td className="text-center py-10 px-14 border-gray-200">
                                <Link className=" py-2 px-4 bg-blue-500 font-bold text-white hover:bg-blue-600   rounded-lg " to={`/cities/edit-employee-city/${employee.id}`}>
                                    
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr key={cities.id} className="bg-white shadow">
                        <td className="text-center py-4 px-6 border-gray-200">{city.id}</td>
                        <td className="text-center py-4 px-6 border-gray-200">{city.name}</td>
                        <td className="text-center py-4 px-6 border-gray-200">No employees</td>
                        <td className="text-center py-4 px-6 border-gray-200">-</td>

                    </tr>
                )

            ))}
        </>
    );
};