import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import '../index.css'
import { NotFound } from "../components/NotFound/NotFound";



export const EditEmployee = () => {

    const navigate = useNavigate()

    const { id } = useParams();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        zip_code: "",
        birth_date: "",
        date_hired: "",
        country_id: "",
        state_id: "",
        city_id: "",
        department_id: ""
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState("");
    const [formError, setFormError] = useState({});

    const [notFound, setNotFound] = useState(false)

    const validateForm = () => {
        let error = {};

        if (formData.first_name === "") {
            error.first_name = 'First name required';
        }
        if (formData.last_name === "") {
            error.last_name = 'Last name required';
        }
        if (formData.zip_code === "") {
            error.zip_code = 'Zip code is required';
        }
        if (formData.address === "") {
            error.address = 'Address required';
        }
        if (formData.country_id === "") {
            error.country_id = 'Country selection is required';
        }
        if (formData.state_id === "") {
            error.state_id = 'State selection is required';
        }
        if (formData.city_id === "") {
            error.city_id = 'City selection is required';
        }
        if (formData.department_id === "") {
            error.department_id = 'Department selection is required';
        }
        if (formData.birth_date === "") {
            error.birth_date = 'Birth date is required';
        }
        if (formData.date_hired === "") {
            error.date_hired = 'Hiring date is required';
        }

        if (formData.salary === "") {
            error.salary = 'Salary is required';
        }

        setFormError(error);
        return Object.keys(error).length === 0;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countriesRes, statesRes, citiesRes, departmentsRes, employeeRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/countries'),
                    axios.get("http://127.0.0.1:8000/api/states"),
                    axios.get("http://127.0.0.1:8000/api/cities"),
                    axios.get("http://127.0.0.1:8000/api/departments"),
                    axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
                ]);

                setCountries(countriesRes.data);
                setStates(statesRes.data);
                setCities(citiesRes.data);
                setDepartments(departmentsRes.data.departments);
                setFormData(employeeRes.data);
            } catch (error) {
                if (error.response?.status === 404) {
                    setNotFound(true)
                } else {
                    console.error("Error fetching data:", error);
                    setMessage("Error loading data");

                }
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formError[name]) {
            setFormError(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    if (notFound) {
        return <NotFound message="Employee's not found" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm()) {
            setMessage("Please fix the errors before submitting");
            return;
        }

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/employees/${id}`,
                formData
            );
            setMessage("Employee updated successfully!");


            setTimeout(() => {


                navigate('/');
            }, 1000);

        } catch (error) {

            setMessage('Error updating employee');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 ">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-2">
                        <label htmlFor="first_name" className="font-medium text-gray-400 curso">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formError.first_name && (
                            <span className="text-sm text-red-500">{formError.first_name}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="last_name" className="font-medium text-gray-400 curso">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formError.last_name && (
                            <span className="text-sm text-red-500">{formError.last_name}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="Country" className="font-medium text-gray-400 curso">Country</label>
                        <select
                            name="country_id"
                            id="country_id"
                            value={formData.country_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {formError.country_id && (
                            <span className="text-sm text-red-500">{formError.country_id}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="state_id" className="font-medium text-gray-400 curso">State</label>
                        <select
                            id="state_id"
                            name="state_id"
                            value={formData.state_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        {formError.state_id && (
                            <span className="text-sm text-red-500">{formError.state_id}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="city_id" className="font-medium text-gray-400 curso">City</label>
                        <select
                            id="city_id"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {formError.city_id && (
                            <span className="text-sm text-red-500">{formError.city_id}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                    <label htmlFor="department_id" className="font-medium text-gray-400 curso">Department</label>
                        <select
                            id="department_id"
                            name="department_id"
                            value={formData.department_id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                        {formError.department_id && (
                            <span className="text-sm text-red-500">{formError.department_id}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="zip_code" className="font-medium text-gray-400 curso">Zip Code</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            value={formData.zip_code}
                            onChange={handleChange}
                            placeholder="Zip Code"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formError.zip_code && (
                            <span className="text-sm text-red-500">{formError.zip_code}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="address" className="font-medium text-gray-400 curso">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formError.address && (
                            <span className="text-sm text-red-500">{formError.address}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="birth_date" className="font-medium text-gray-400 curso">Birth Date</label>
                        <input
                            type="date"
                            id="birth_date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Birth Date"
                        />
                        {formError.birth_date && (
                            <span className="text-sm text-red-500">{formError.birth_date}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="date_hired" className="font-medium text-gray-400 curso">Date Hired</label>
                        <input
                            type="date"
                            id="date_hired"
                            name="date_hired"
                            value={formData.date_hired}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Date Hired"
                        />
                        {formError.date_hired && (
                            <span className="text-sm text-red-500">{formError.date_hired}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="salary" className="font-medium text-gray-400 curso">Salary</label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            placeholder="Salary"
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {formError.salary && (
                            <span className="text-sm text-red-500">{formError.salary}</span>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-around ">
                    <button
                        type="submit"
                        className="w-1/3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Update Employee
                    </button>

                    <Link to="/employees"
                        type="submit"
                        className="w-1/3 border border-blue-500 text-blue-500 text-center p-3 rounded-lg hover:bg-gray-200 transition-colors"
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
    );
};