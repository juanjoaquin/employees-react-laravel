import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CreateCountry = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        country_code: ""
    });

    const [message, setMessage] = useState(""); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://127.0.0.1:8000/api/countries", formData);
            setMessage("Country created successfully!");
            setFormData({ name: "", country_code: "" }); 
        } catch (error) {
            setMessage("Error creating country");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center pt-20 xl:pt-6 ">
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-lg rounded-lg w-full max-w-md">
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
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Create Country
                </button>
                
                <div className="text-center mt-4">

                <Link to="/countries" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
                </div>

                {message && (
                    <p className="mt-4 text-center text-sm text-green-600">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};
