import axios from "axios";
import React, { useEffect, useState } from "react";
import { DepartmentsList } from "./DepartmentsList";
import { Link } from "react-router-dom";
import AllDepartments from "./AllDepartments";




export const Department = () => {

    const [data, setData] = useState([]);
    

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/departments')
                setData(response.data.departments)

            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/departments/${id}`);
            setData(data.filter((department) => department.id !== id));
        } catch(error) {
            console.log(error);
        }
    };



    return (
        <div>

            <div className="flex flex-row justify-center bg-gray-100 min-h-screen">
                <div className="overflow-x-auto m-2">

                    <div className="mt-16 py-5 px-2 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg">


                        <h1 className="text-3xl font-bold text-gray-800 uppercase">Departments</h1>
                        <Link to="/create-department" className=" bg-blue-600 hover:bg-blue-700 px-2  p-3 rounded-lg shadow-lg font-bold text-white ">New Department</Link>

                    </div>
                
                {<AllDepartments data={data} onDelete={handleDelete} />}
                

                    <hr class="border-t-2 border-gray-300 my-4 mt-8" />

                    
                    <div className=" bg-gray-50 py-4 rounded-lg shadow flex items-center">
                        <h1 className="uppercase text-2xl font-bold text-gray-700 m-2">Employee's Departments</h1>
                        <span className="material-symbols-outlined text-gray-700">
                            keyboard_double_arrow_down
                        </span>
                    </div>


                    <div className="overflow-x-auto">
                    <table className=" border-separate border-spacing-y-8   ">
                        <thead className=" text-gray-600 uppercase  ">
                            <tr>
                                <th className="px-6 py-4">Employee id</th>
                                <th className="px-6 py-4">Department Name</th>
                                <th className="px-6 py-4">Employees</th>
                                <th className="px-6 py-4">Action department <br />employees</th>
                                
                            </tr>
                        </thead>
                        
                        <tbody >
                            {<DepartmentsList data={data} />}

                        </tbody>
                    </table>
                        </div>                    
                </div>
            </div>
        </div>
    );
};