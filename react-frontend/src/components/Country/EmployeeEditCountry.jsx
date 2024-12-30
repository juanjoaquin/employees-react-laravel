import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


export const EmployeeEditCountry = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        country_id: ''
    });

    const [countries, setCountries] = useState([]);
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState({});
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const employeeResponse = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`);
                const countriesResponse = await axios.get('http://127.0.0.1:8000/api/countries');
                setCountries(countriesResponse.data);

                setFormData({ country_id: employeeResponse.data.country_id });
            } catch (error) {
                console.log(error);
            }
        };


        const getEmployeeById = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
                setEmployee(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }
        getEmployeeById();
        getData();
    }, [id]);

    const validateForm = () => {
        let error = {};
        if (!formData.country_id) {
            error.country_id = 'Country selection is required';
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!validateForm()) {
            setMessage('Error on form');
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/employees/${id}/update-country`, { country_id: formData.country_id });
            setTimeout(() => {
                navigate('/countries')
            }, 1000);
            setMessage("Country updated successfully!");
        } catch (error) {
            setMessage("Error updating country");
            console.error(error);
        }
    };

    return (
        <div className="text-center max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Employee's Department</h1>
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
                <li className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                    <span className="font-medium text-gray-600">Department:</span>
                    <span className="text-gray-800 font-bold">{employee.department ? employee.department.name : "No Department assigned."}</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
                    <span className="font-medium text-gray-600">Actual Country:</span>
                    <span className="text-gray-800 font-bold">{employee.country ? employee.country.name : "No Country assigned..."}</span>
                </li>
            </ul>
        </div>

        <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label className="flex flex-col text-left">
                        <span className="text-lg  text-gray-700 mb-1 uppercase font-bold">Country</span>
                        <select
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2.5 border"
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {formError.country_id &&
                        <p className="text-red-500 text-sm mt-1">{formError.country_id}</p>
                    }
                </div>
                <div className="flex text-center justify-between">

                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200"
                    >
                    Save Changes
                </button>
                <Link
                    to="/countries"
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
};