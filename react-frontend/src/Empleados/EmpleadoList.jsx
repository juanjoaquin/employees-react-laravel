import React from "react";
import { Link } from "react-router-dom";
import '../index.css'


export const EmpleadoList = ({ employee, onDelete }) => {



    const handleDeleteClick = () => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar a ${employee.first_name} ${employee.last_name}?`);
        if (confirmDelete) {
            onDelete(employee.id); 
        }
    };


    return (
        <tr className="bg-white shadow ">
            <td className="text-center py-10 px-14  border-gray-200 ">{employee.first_name} {employee.last_name}</td>
            {/* <td className="text-center py-10 px-14  border-gray-200">{employee.last_name}</td> */}
            <td className="text-center py-10 px-14  border-gray-200">{employee.country.name}</td>
            <td className="text-center py-10 px-14  border-gray-200">{employee.department.name}</td>
            <td className="text-center py-10 px-14  border-gray-200 ">{employee.salary === 0 ? 'No salary' : `$ ${employee.salary.toLocaleString()}`}</td>
            <td className="text-center py-10 px-14  border-gray-200 ">{employee.date_hired}</td>
            <td className="text-center py-10 px-14  border-gray-200 flex gap-4 ">

                
            <Link to={`/edit-employee/${employee.id}`}>
                <span  class="material-symbols-outlined text-blue-500 hover:text-blue-600 cursor-pointer">
                    edit_square
                </span>
            </Link>
                
            

                <span onClick={handleDeleteClick}  class="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer">
                    person_remove
                </span>


            </td>
        </tr>
    );
};
