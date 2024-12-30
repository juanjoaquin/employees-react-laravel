import React, { useEffect, useState } from 'react'
import '../../index.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { StateEmployeeList } from './StateEmployeeList';
import { StateList } from './StateList';



export const State = () => {

    const [states, setStates] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/states')
                setStates(response.data)

            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/states/${id}`)
            setStates(states.filter((state) => state.id !== id))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>

            <div className="flex flex-row justify-center bg-gray-100 min-h-screen">
                <div className='overflow-x-auto m-2'>

                    <div className="mt-16 py-5 px-2 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg">


                        <h1 className="text-3xl font-bold text-gray-800 uppercase">States</h1>
                        <Link to="/create-state" className=" bg-blue-600 hover:bg-blue-700 px-2 p-3 rounded-lg shadow-lg font-bold text-white ">New State</Link>

                    </div>



                    {<StateList states={states} onDelete={handleDelete} />}



                    <hr class="border-t-2 border-gray-300 my-4 mt-8" />

                    <div className=" bg-gray-50 py-4 rounded-lg shadow flex items-center">
                        <h1 className="uppercase text-2xl font-bold text-gray-700 m-2">Employee's States</h1>
                        <span className="material-symbols-outlined text-gray-700">
                            keyboard_double_arrow_down
                        </span>
                    </div>

<div className='overflow-x-auto'>

                    <table className=" border-separate border-spacing-y-8 ">
                        <thead className=" text-gray-600 uppercase  ">
                            <tr>

                                <th className="px-6 py-4">Id Employee</th>
                                <th className="px-6 py-4">State</th>
                                <th className="px-6 py-4">emplooyes in <br />State</th>
                                <th className="px-6 py-4">City of <br />State</th>
                                <th className="px-6 py-4">Action on <br /> employee state</th>
                            </tr>
                        </thead>
                        <tbody >

                            {<StateEmployeeList states={states} />}
                        </tbody>
                    </table>
</div>
                </div>

            </div>
        </div>
    );
};
