import React, { useEffect, useState } from 'react'
import '../../index.css'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NotFound } from '../NotFound/NotFound';


export const EditState = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    country_id: ''
  })

  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/states/${id}`)
        setFormData({
          name: response.data.states.name,
          country_id: response.data.states.country_id
        });

      }

      catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true)
        } else {
          console.log(error)
          setMessage('Error getting data');

        }
      }
    }

    const getCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countries')
        setCountries(response.data)
      }
      catch (error) {
        console.log(error)
      }
    }

    getStates();
    getCountries();
  }, [id])


  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) {
      formErrors.name = 'State name is required';
    }
    if (!formData.country_id) {
      formErrors.country_id = 'Country is required';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }

  if (notFound) {
    return <NotFound message="State not found" />;
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
      await axios.put(`http://127.0.0.1:8000/api/states/${id}`, formData)
      setMessage('State modifed succesfully!')
      setTimeout(() => {
        navigate('/states')
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
            value={formData.name}
            id="name"
            onChange={handleChange}
            placeholder="Create State name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>
          )}

          <div className="mb-4">

            <label htmlFor="country_id" className="block text-gray-700 font-bold mb-2"></label>
            <select name="country_id" id="country_id" onChange={handleChange} value={formData.country_id} className="className={`w-full p-2 border border-gray-300 rounded ${errors.country_id ? 'border-red-500' : ''}`}">
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option value={country.id} key={country.id}>{country.name}</option>
              ))}
            </select>
            {errors.country_id && (
              <p className="text-red-500 text-xs font-bold mt-1">{errors.country_id}</p>
            )}


            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Update State
            </button>

            <div className="text-center mt-4">

              <Link to="/cities" className=" bg-gray-100 border border-blue-500 text-blue-500 py-2 px-6 rounded hover:bg-gray-200 transition-colors">Cancel</Link>
            </div>

          </div>
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
