import React, { useEffect, useState } from 'react';

import { axiosClient } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { STUDENT_DASHBOARD_ROUTE } from '../../router';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

const CreateItineraryForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        duration: '',
        image: '',
        destinations: [{ name: '', accommodation: '', places_to_visit: '', activities: [] }],
    });



    useEffect(() => {
        async function fetchCategories() {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                const response = await axiosClient.get('/api/categories', { headers });
                console.log(response);
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'activities') {
            const newDestinations = [...formData.destinations];
            newDestinations[index][name] = value.split(',').map(activity => activity.trim());
            setFormData({ ...formData, destinations: newDestinations });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleDestinationChange = (e, index) => {
        const { name, value } = e.target;
        const newDestinations = [...formData.destinations];
        newDestinations[index][name] = value;
        setFormData({ ...formData, destinations: newDestinations });
    };

    const addDestination = () => {
        setFormData({
            ...formData,
            destinations: [...formData.destinations, { name: '', accommodation: '', places_to_visit: '', activities: [] }],
        });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };
            console.log(formData);
            console.log(formData);
            const response = await axiosClient.post('api/itineraries', formData, { headers });
            if (response.status === 201) {
                navigate(STUDENT_DASHBOARD_ROUTE)
            }
            // Handle success response here
        } catch (error) {
            console.error('Failed to create itinerary:', error.message);
            // Handle error response here
        }
    };



    return (
      
        <form className='w-[50vw] mx-auto' onSubmit={handleSubmit}>
            <h1 className='text-bold text-3xl text-center m-4 '>Create Itenerary</h1>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category:</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category_id" value={formData.category_id} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select></div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Duration:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" name="duration" value={formData.duration} onChange={handleChange} />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image:</label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="file" name="image" onChange={handleImageChange} />
                </div>
            </div>
            {formData.destinations.map((destination, index) => (
                <div key={index}>
                    <h3 className='text-bold text-3xl text-center'>Destination {index + 1}</h3>
                    <div class="grid gap-6 mb-6 md:grid-cols-2" >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name: </label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="name" value={destination.name} onChange={(e) => handleDestinationChange(e, index)} />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Accommodation: </label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="accommodation" value={destination.accommodation} onChange={(e) => handleDestinationChange(e, index)} />
                        </div>   <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Places to Visit:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="places_to_visit" value={destination.places_to_visit} onChange={(e) => handleDestinationChange(e, index)} />

                        </div><div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Activities (comma-separated):</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="activities" value={destination.activities.join(', ')} onChange={(e) => handleChange(e, index)} />
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center  justify-end">
            <button className='p-2 flex justify-end' type="button" onClick={addDestination}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Destination</span>  </button></div>
            <Button  type="submit">Submit</Button>
        </form>
    );
};

export default CreateItineraryForm;
