import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CountryList } from "./CountryList";
import { EmployeeCountryList } from "./EmployeeCountryList";


export const Country = () => {
    const [countryData, setCountryData] = useState([]);
    const { id } = useParams()


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/countries');
                setCountryData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/countries/${id}`)
            setCountryData(countryData.filter((country) => country.id !== id))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="m-2">

            <div className="flex flex-row justify-center bg-gray-100 min-h-screen">
                <div className=" overflow-x-auto">


                    <div className="mt-16 py-5 px-2 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 rounded-lg">


                        <h1 className="text-3xl font-bold text-gray-800 uppercase">Countries</h1>
                        <Link to="/create-country" className=" bg-blue-600 hover:bg-blue-700 px-2 p-3 rounded-lg shadow-lg font-bold text-white ">New Country</Link>

                    </div>


                    <hr class="border-t-2 border-gray-300 my-4 mt-8" />
                    <div className="overflow-x-auto">

                        <table className=" border-separate border-spacing-y-8 ">
                            <thead className=" text-gray-600 uppercase  ">
                                <tr>
                                    <th>id</th>
                                    <th className="px-6 py-4">Country Name</th>
                                    <th className="px-6 py-4">Country Code</th>
                                    <th className="px-6 py-4">NUMBER EMPLOYEES</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="rounded-lg ">
                                {countryData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center font-bold p-4 ">
                                            No hay nombre
                                        </td>
                                    </tr>
                                ) : (

                                    countryData.map((country) => (
                                        <CountryList key={country.id} country={country} onDelete={handleDelete} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className=" bg-gray-50 py-4 rounded-lg shadow flex items-center m-4 mb-4 ">
                        <h1 className="uppercase text-2xl font-bold text-gray-700 m-2">Employee's Countries</h1>
                        <span className="material-symbols-outlined text-gray-700">
                            keyboard_double_arrow_down
                        </span>
                    </div>
                    
                    <div className="overflow-x-auto">

                    {<EmployeeCountryList countryData={countryData} />}
                    </div>



                </div>


            </div>



        </div>

    );
};
