import React, { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';
import { Link } from "react-router-dom";
import { EmpleadoList } from "./EmpleadoList";


export const AllEmpleados = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const filter = !search ? data : data.filter((data) => data.first_name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/employees')
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()


    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
            setData(data.filter((employee) => employee.id !== id));
            alert("Employee deleted successfully");
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee");
        }
    };



    return (
        <div>

            <div className="flex flex-col bg-gray-100 min-h-screen p-4 md:p-8">
                <div>
                    <div className="uppercase mt-20 lg:mt-12 xl:max-w-screen-lg ">
                        <h1 className="text-center text-gray-700 font-bold text-3xl">List of employees</h1>

                    </div>

                    <div className="mt-8 py-5 px-2 flex flex-wrap items-center bg-gray-50 rounded-lg xl:justify-between xl:mx-auto xl:max-w-screen-lg space-y-4 xl:space-y-0">
                        <div className="relative flex-grow">
                            <span className="material-symbols-outlined absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-600">
                                search
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={searcher}
                                className="w-full sm:w-1/2  bg-gray-50 pl-10 pr-4 py-2 border border-blue-500 rounded-lg shadow"
                                placeholder="Search for first name"
                            />
                        </div>

                        <Link
                            to="/create-employee"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-lg font-bold text-white text-sm uppercase ml-4"
                        >
                            New Employee
                        </Link>
                    </div>


                    <hr class="border-t-2 border-gray-300 my-4 mt-8" />
                    <div className="overflow-x-auto xl:flex xl:justify-center">

                        <table className=" border-separate border-spacing-y-8 ">
                            <thead className=" text-gray-600 uppercase  ">
                                <tr>
                                    <th className="px-6 py-4">First Name & <br /> Last Name</th>
                                    {/* <th className="px-6 py-4">Last Name</th> */}
                                    <th className="px-6 py-4">Country</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Salary</th>
                                    <th className="px-6 py-4">Data hired</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="rounded-lg ">
                                {filter.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center font-bold p-4 ">
                                            No hay nombre
                                        </td>
                                    </tr>
                                ) : (

                                    filter.map((employee) => (
                                        <EmpleadoList key={employee.id} employee={employee} onDelete={handleDelete} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>



    );
};