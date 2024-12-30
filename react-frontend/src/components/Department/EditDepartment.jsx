import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";



export const EditDepartment = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",

    });
    const [formError, setFormError] = useState({});
    const [message, setMessage] = useState("");

    const [redirectMessage, setRedirectMessage] = useState("");
    const [notFound, setNotFound] = useState(false)



    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/departments/${id}`)
                setFormData({
                    name: response.data.department.name
                })
            }
            catch (error) {
                if(error.response?.status === 404) {
                    setNotFound(true)
                }
                else {
                    console.log(error)
                    setMessage("Error loading data");
                }
            }
        }
        getData();
    }, [id])

    const validateForm = () => {
        let error = {};
        if (formData.name === "") {
            error.name = 'Name is required';
        }
        setFormError(error);
        return Object.keys(error).length === 0;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (notFound) {
        return <NotFound message="Department not found" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        if (!validateForm()) {
            setMessage("Please fix the errors");
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/departments/${id}`, formData)
            setMessage("Department updated successfully!");

            setTimeout(() => {
                setRedirectMessage("Redirigiendo...");
                setTimeout(() => {
                    navigate('/departments');
                }, 1000);
            }, 1000);
        }
        catch (error) {
            console.log(error)
            setMessage("Error updating form");
        }
    }


    return (
        <div className="flex justify-center pt-20 sm:pt-6  xl:pt-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md"  >
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Department Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter department name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {formError.name && <p className="text-red-500 text-xs mt-1">{formError.name}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Update Department
                </button>
                
                <div className="text-center mt-4">

                <Link to="/departments" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                </div>
                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}

                <div className="text-center font-bold text-lg mt-4">

                    {message && (redirectMessage)}
                </div>
            </form>

        </div>
    );
};