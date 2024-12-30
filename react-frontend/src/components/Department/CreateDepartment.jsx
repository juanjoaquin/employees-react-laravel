import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const CreateDepartment = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: ''
    });

    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) {
            formErrors.name = 'Department name is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/departments', formData)
            setMessage('Department created succesfully');
            setFormData({ name: '' });
            setErrors({});
            setTimeout(() => {
                navigate('/departments')
            }, 1000);
        }
        catch (error) {
            console.log(error)
            setMessage('Error create department');
        }

    }


    return (
        <div className="flex justify-center pt-20 xl:pt-6">
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Department Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter country name"
                        className="w-full p-2 border border-gray-300 rounded"

                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Create Department
                </button>
                
                <div className="text-center mt-4">

                <Link to="/departments" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                </div>
                {message && (
                    <div className={`mt-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {message}


                    </div>
                )}
            </form>
        </div>
    );
};
