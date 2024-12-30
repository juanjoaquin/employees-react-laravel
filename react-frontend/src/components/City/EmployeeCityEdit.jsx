import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFound } from '../NotFound/NotFound'



export const EmployeeCityEdit = () => {
    const { id } = useParams()

    const [formData, setFormData] = useState({
        city_id: '',
    })

    const [cities, setCities] = useState([])
    const [message, setMessage] = useState("");
    const [formError, setFormError] = useState({});

    const [employee, setEmployee] = useState([])

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const employeeResponse = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
                const citiesResponse = await axios.get('http://127.0.0.1:8000/api/cities'); 

                setCities(citiesResponse.data)
                setFormData({
                    city_id: employeeResponse.data.city ? employeeResponse.data.city_id : ''
                })
            }
            catch (error) {
                if (error.response?.status === 404) {
                    setNotFound(true)
                }
                else {
                    console.log(error)
                    setMessage('Error getting API')
                }
            }
        }
        const getEmployeeId = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
                setEmployee(response.data)
            }
            catch (error) {
                console.log(error)
                setMessage('Error loading employee data');
            }
        }
        getData();
        getEmployeeId();
    }, [id])

    if (!employee) {
        return <p>Loading employee data...</p>;
    }
    if (notFound) {
        return <NotFound message="Employee's City not found" />;
    }

    const validateForm = () => {
        let error = {};
        if (!formData.city_id) {
            error.city_id = 'Department selection is required';
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm()) {
            setMessage("Error, fix the errors");
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/employees/${id}/update-city`,
                { city_id: formData.city_id }); 
            setMessage("City updated successfully!");
        } catch (error) {
            setMessage("Error updating city");
            console.error(error);
        }
    };

    return (
        <div className="text-center max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-20">Edit Employee's City</h1>
            <div className="mb-8">
                <ul className="space-y-4">
                    <li className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <span className="font-medium text-gray-600">Employee:</span>
                        <span className="text-gray-800 font-bold uppercase">{employee.first_name} {employee.last_name}</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
                        <span className="font-medium text-gray-600">ID:</span>
                        <span className="text-gray-800 font-bold">{employee.id}</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <span className="font-medium text-gray-600">Date hired:</span>
                        <span className="text-gray-800 font-bold">{employee.date_hired}</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
                        <span className="font-medium text-gray-600">Country:</span>
                        <span className="text-gray-800 font-bold">{employee.country ? employee.country.name : "No Country assigned..."}</span>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <span className="font-medium text-gray-600">Actual City:</span>
                        <span className="text-gray-800 font-bold">{employee.city ? employee.city.name : "No City assigned."}</span>
                    </li>
                </ul>
            </div>

            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <label className="flex flex-col text-left">
                            <span className="text-lg  text-gray-700 mb-1 uppercase font-bold">City</span>
                            <select
                                name="city_id"
                                value={formData.city_id}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2.5 border"
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {formError.city_id &&
                            <p className="text-red-500 text-sm mt-1">{formError.city_id}</p>
                        }
                    </div>
                    <div className="flex text-center justify-between ">

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                        <Link
                            to="/cities"
                            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-blue-600 text-blue-600 font-medium text-sm rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
                {message && (
                    <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {message}


                    </div>
                )}


            </div>

        </div>
    );
}



