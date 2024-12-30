import React, { useEffect, useState } from "react";
import '../../index.css'
import axios from "axios";
import { Link } from "react-router-dom";


export const CreateCity = () => {

    const [formData, setFormData] = useState({
        name: '',
        state_id: ''
    })

    const [states, setStates] = useState([]);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const getStates = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/states');
                setStates(response.data);
            }
            catch (error) {
                console.log(error)
                setMessage('Error getting states');
            }
        }
        getStates();
    }, [])

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) {
            formErrors.name = 'Department name is required';
        }
        if (!formData.state_id) {
            formErrors.state_id = 'State is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/cities', formData)
            setFormData({ name: '', state_id: '' });
            setMessage('City created succesfully');
        }
        catch (error) {
            console.log(error)
            setMessage('Error on create City');
        }
    }

    return (
        <div className="flex justify-center pt-20 xl:pt-6">


            <form action="" onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md">
                <div className="mb-4">

                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>

                    <input type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        placeholder="Create city name"
                        className="w-full p-2 border border-gray-300 rounded"
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
                            Create City
                        </button>

                        <div className="text-center mt-4">

                            <Link to="/cities" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                        </div>

                    </div>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};