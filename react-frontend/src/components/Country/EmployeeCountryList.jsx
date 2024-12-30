import React from 'react';
import { Link } from 'react-router-dom';

export const EmployeeCountryList = ({ countryData }) => {
  return (
    <table className="min-w-full bg-white border rounded-lg shadow-md overflow-x-auto">
      <thead>
        <tr className='uppercase text-gray-600'>
          <th className="py-2 px-4 border-b text-center">ID</th>
          <th className="py-2 px-4 border-b text-center">Country Name</th>
          <th className="py-2 px-4 border-b text-center">Employee Name</th>
          <th className="py-2 px-4 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {countryData.map((country) => (
          <>
            <tr key={country.id} className="bg-gray-100 ">
              <td colSpan="5" className="py-4 px-6 font-semibold uppercase text-blue-600">
                {country.name} - {country.employees.length} Employees
              </td>
            </tr>
            {country.employees && country.employees.length > 0 ? (
              country.employees.map((employee, index) => (
                <tr key={employee.id} className={` ${index % 2 === 0 ? "bg-blue-50" : "bg-gray-100"}`}>
                  <td className="text-center py-4 px-2 border-b">{employee.id}</td>
                  <td className="text-center py-4 px-4 border-b">{country.name}</td>
                  <td className="text-center py-4 px-4 border-b">
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td className="text-center py-4 px-4 border-b">
                    <Link
                      className="py-2 px-4 bg-blue-500 font-bold text-white hover:bg-blue-600 rounded-lg"
                      to={`/countries/update-country-employee/${employee.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={`no-employee-${country.id}`}>
                <td colSpan="5" className="text-center py-4 px-6 text-gray-700 font-medium">
                  No employees in this country.
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};