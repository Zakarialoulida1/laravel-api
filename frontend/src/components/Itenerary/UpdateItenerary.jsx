import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosClient } from '../../api/axios';
import { useParams } from 'react-router-dom';

const UpdateItenerary = () => {
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto] = useState('');
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const response = await axiosClient.get(`/api/itineraries/${id}/edit`, { headers });
            setInputs(response.data.itinerary);
        } catch (error) {
            console.error('Failed to fetch itinerary data:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await axiosClient.get('/api/categories', { headers });
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const uploadItinerary = async () => {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', inputs.title);
        formData.append('category_id', inputs.category_id);
        formData.append('duration', inputs.duration);
        if (fileimage) {
            formData.append('image', fileimage);
        }

        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data' // Not needed here
            };
            const response = await axiosClient.post(`/api/itineraries/${id}`, formData, { headers });
            console.log(response.data.message);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Failed to update itinerary:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadItinerary();
    };

    return (
        <form onSubmit={handleSubmit} className='w-[50vw] mx-auto'>
            <p className='texy-success'><b>{message}</b></p>
            {error && <div className="error">{error}</div>}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="title" value={inputs.title} onChange={handleChange} placeholder="Title" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category_id" value={inputs.category_id} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" name="duration" value={inputs.duration} onChange={handleChange} placeholder="Duration" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image:</label>
                    <img src={`http://127.0.0.1:8000/storage/${inputs.image}`} alt={inputs.title} className="w-40 h-32 object-cover mb-2" />
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="file" name="image" onChange={(e) => { setPhoto(e.target.files[0]) }} placeholder="Image URL" />
                </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update Itinerary</button>
        </form>
    );
};

export default UpdateItenerary;
