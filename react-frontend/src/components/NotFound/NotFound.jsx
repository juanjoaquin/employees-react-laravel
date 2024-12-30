import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = ({ message = "Page not found" }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-200">404</h1>
                    <p className="text-2xl font-semibold text-gray-600 mt-4">{message}</p>
                    <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <p className="" />
                    <span class="material-symbols-outlined mr-2">
                        home
                    </span>
                    Go Home
                </button>
            </div>
        </div>
    );
};