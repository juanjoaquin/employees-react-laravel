import React from 'react'
import { Link } from 'react-router-dom';


const EmployeeCity = ({cities, onDelete}) => {

    const handleDelete = (city) => {
        const confirmDelete = window.confirm(`Estás seguro de eliminar ${city.name}`)
        if(confirmDelete){
            onDelete(city.id)
        }
    }


  return (
    <div className="overflow-x-auto shadow rounded-lg mt-5">

            

    <table className="min-w-full bg-white border border-gray-200 ">
        <thead>
            <tr>
                <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                    City ID
                </th>
                <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                    City Name
                </th >
                <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                    State of City
                </th >
                <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                    City actions
                </th>
            
            </tr>
        </thead>
        <tbody >
            {cities.map((city, index) => (
                <tr
                    key={city.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-sm`}
                >
                    <td className="text-center px-6 py-4 border-b border-gray-200">{city.id}</td>
                    <td className="text-center px-6 py-4 border-b border-gray-200 font-bold uppercase">{city.name}</td>
                    <td className="text-center px-6 py-4 border-b border-gray-200 font-bold uppercase">{city.state.name}</td>
                    <td className="text-center px-6 py-4 border-b border-gray-200 flex gap-4 justify-center">

                        <Link to={`/edit-city/${city.id}`} className="material-symbols-outlined text-blue-500 hover:text-blue-600 cursor-pointer">
                            edit_square
                        </Link>
                        <span onClick={()=> handleDelete(city)} className="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer">
                            delete
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

</div>
  );
;}

export default EmployeeCity