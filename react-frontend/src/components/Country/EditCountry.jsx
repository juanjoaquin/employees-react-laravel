import React, { useEffect, useState } from "react";
import '../../index.css';
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";




export const EditCountry = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        country_code: ""
    });


    const [message, setMessage] = useState("");
    const [formError, setFormError] = useState({});
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/countries/${id}`);
                

                setFormData({
                    name: response.data.country.name,
                    country_code: response.data.country.country_code
                });

            } catch (error) {
                if(error.response?.status === 404) {
                    setNotFound(true)
                } else {
                    console.log(error);
                    setMessage("Error loading data");

                }
            }
        };
        getData();
    }, [id]);

 
    if (notFound) {
        return <NotFound message="Country not found" />;
    }


    const validateForm = () => {
        let error = {};
        if (formData.name === "") {
            error.name = 'Name is required';
        }
        if (formData.country_code === "") {
            error.country_code = 'Country code is required';
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
            setMessage("Please fix the errors");
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/countries/${id}`, formData);
            setMessage("Country updated successfully!");

            setTimeout(() => {
                navigate('/countries')
            }, 1000);
        } catch (error) {
            setMessage("Error updating country");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center pt-20 xl:pt-6">
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md" >
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Country Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter country name"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {formError.name && <p className="text-red-500 text-xs mt-1">{formError.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="country_code" className="block text-gray-700 font-bold mb-2">Country Code</label>
                    <input
                        type="text"
                        id="country_code"
                        name="country_code"
                        value={formData.country_code}
                        onChange={handleChange}
                        placeholder="Enter country code"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {formError.country_code && <p className="text-red-500 text-xs mt-1">{formError.country_code}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Update Country
                </button>
                
                <div className="text-center mt-4">

                <Link to="/countries" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                </div>
                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </form>
            <div className="flex justify-center">


            </div>
        </div>
    );
};