import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NotFound } from "../NotFound/NotFound";



export const EditCity = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        state_id: ''
    })

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const [states, setStates] = useState([])
    const [notFound, setNotFound] = useState(false)


    useEffect(() => {
        const getData = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/city/${id}`)
                setFormData({
                    name: response.data.city.name,
                    state_id: response.data.city.state_id
                });

            } catch (error) {
                if (error.response?.status === 404) {
                    setNotFound(true)
                }
                else {
                    console.log(error)
                    setMessage('Error getting cities')

                }
            }

        }

        const getStates = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/states`)
                setStates(response.data)

            } catch (error) {
                console.log(error)
                setMessage('Error getting cities')
            }
        }
        getStates()
        getData();
    }, [id])

    const validateForm = () => {
        let error = {};
        if (formData.name === "") {
            error.name = 'Name is required';
        }
        if (formData.country_code === "") {
            error.country_code = 'Country code is required';
        }
        setErrors(error);
        return Object.keys(error).length === 0;
    };

    if (notFound) {
        return <NotFound message="Employee's not found" />;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateForm()) {
            setMessage('Fix the errors')
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/city/${id}`, formData)
            setMessage('City modifed succesfully!')
            setTimeout(() => {
                navigate('/cities')
            }, 1000);
        }
        catch (error) {
            console.log(error)
            setMessage('Error editing form')
        }
    }

    return (
        <div className="flex justify-center pt-20 xl:pt-6">


            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md">
                <div className="mb-4">

                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>

                    <input type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        placeholder="Create city name"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={formData.name}
                    />

                    {errors.name && (
                        <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>
                    )}

                    <div className="mb-4">

                        <label htmlFor="state_id" className="block text-gray-700 font-bold mb-2"></label>
                        <select name="state_id" id="state_id" onChange={handleChange} value={formData.state_id} className="className={`w-full p-2 border border-gray-300 rounded ${errors.state_id ? 'border-red-500' : ''}`}">
                            <option value="">Select a State</option>
                            {states.map((state) => (
                                <option value={state.id} key={state.id}>{state.name}</option>
                            ))}
                        </select>
                        {errors.state_id && (
                            <p className="text-red-500 text-xs font-bold mt-1">{errors.state_id}</p>
                        )}


                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 mt-2 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            Update City
                        </button>

                        <div className="text-center mt-4">

                            <Link to="/cities" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                        </div>

                    </div>
                </div>
                {message && (
                    <div className={`mt-4 p-3 rounded text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {message}


                    </div>
                )}
            </form>
        </div>
    );
};