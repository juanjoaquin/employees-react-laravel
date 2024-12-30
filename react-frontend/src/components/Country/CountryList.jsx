import React from "react";
import { Link } from "react-router-dom";


export const CountryList = ({country, onDelete}) => {

    const handleDelete = () => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el país ${country.name} ?`);
        if(confirmDelete) {
            onDelete(country.id)
        }
    }

    return(
        <tr className="bg-white shadow ">
            <td className="text-center py-10 px-14  border-gray-200 ">{country.id}</td>
            <td className="text-center py-10 px-14  border-gray-200 ">{country.name}</td>
            <td className="text-center py-10 px-14  border-gray-200">{country.country_code}</td>
            <td className="text-center py-10 px-14  border-gray-200">{country.employees.length > 0 ? country.employees.length : 'No employee'}</td>
            <td className="text-center py-10 px-14  border-gray-200 flex gap-4 ">

            
            <Link to={`/edit-country/${country.id}`}>
                <span  class="material-symbols-outlined text-blue-500 hover:text-blue-600 cursor-pointer">
                    edit_square
                </span>
            </Link>
                
            

                <span onClick={handleDelete} class="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer">
                    delete
                </span>


            </td>
            
        </tr>
    );
};