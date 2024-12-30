import React from 'react';
import '../../index.css'
import { Link } from 'react-router-dom';


const AllDepartments = ({ data, onDelete }) => {

    const confirmDelete = (department) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el departamento ${department.name}?`);
        if (confirmDelete) {
            onDelete(department.id);
        }
    };

    return (
        <div className="overflow-x-auto shadow rounded-lg mt-5">

            

            <table className="min-w-full bg-white border border-gray-200 ">
                <thead>
                    <tr>
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            Department ID
                        </th>
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            Department Name
                        </th >
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            Deparment actions
                        </th>
                    
                    </tr>
                </thead>
                <tbody >
                    {data.map((department, index) => (
                        <tr
                            key={department.id}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-sm`}
                        >
                            <td className="text-center px-6 py-4 border-b border-gray-200">{department.id}</td>
                            <td className="text-center px-6 py-4 border-b border-gray-200 font-bold uppercase">{department.name}</td>
                            <td className="text-center px-6 py-4 border-b border-gray-200 flex gap-4 justify-center">

                                <Link to={`/edit-department/${department.id}`} className="material-symbols-outlined text-blue-500 hover:text-blue-600 cursor-pointer">
                                    edit_square
                                </Link>
                                <span onClick={() => confirmDelete(department)} className="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer">
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AllDepartments;
