import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export const StateList = ({ states, onDelete }) => {

    const [messageDelete, setMessageDelete] = useState('')

    const handleDelete = (state) => {
        const confirmDelete = window.confirm(`Estás seguro de eliminar ${state.name}`)
        if (confirmDelete) {
            onDelete(state.id)
            
            setMessageDelete('Eliminado broder xD')

            setTimeout(() => {
                setMessageDelete('')
            }, 1000);
        }
    }


    return (
        <div className="overflow-x-auto shadow rounded-lg mt-5">



            <table className="min-w-full bg-white border border-gray-200 ">
                <thead>
                    <tr>
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            State ID
                        </th>
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            State Name
                        </th >
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            City of State
                        </th >
                        <th className="text-center px-6 py-3 border-b border-gray-200 bg-gray-50  text-sm font-medium text-gray-600 uppercase">
                            State actions
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {states.map((state, index) => (
                        <tr
                            key={state.id}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-sm`}
                        >
                            <td className="text-center px-6 py-4 border-b border-gray-200">{state.id}</td>
                            <td className="text-center px-6 py-4 border-b border-gray-200 font-bold uppercase">{state.name}</td>
                            <td className="text-center px-6 py-4 border-b border-gray-200 font-bold uppercase">{state.country.name}</td>
                            <td className="text-center px-6 py-4 border-b border-gray-200 flex gap-4 justify-center">

                                <Link to={`/edit-state/${state.id}`} className="material-symbols-outlined text-blue-500 hover:text-blue-600 cursor-pointer">
                                    edit_square
                                </Link>
                                <span onClick={() => handleDelete(state)} className="material-symbols-outlined text-red-600 hover:text-red-700 cursor-pointer">
                                    delete
                                </span>
                                
                            </td>

                        </tr>
                        
                    ))}

                </tbody>
            </table>
            {messageDelete && <p className="text-green-500 w-auto bg-green-100 font-bold text-center mt-4">{messageDelete}</p>}
        </div>
    );
};
