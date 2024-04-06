import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../api/axios';
import { Link } from 'react-router-dom';

export default function Itineraries() {
    const [itinerary, setItinerary] = useState([]);

    useEffect(() => {
        axiosClient.get('api/itineraries')
            .then(response => {
                setItinerary(response.data);
            })
            .catch(error => {
                console.error('Error fetching itineraries:', error);
            });
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itinerary.map(itineraryItem => (
                <div key={itineraryItem.id} className="bg-white shadow rounded-lg p-4">
                    <img src={`http://127.0.0.1:8000/storage/${itineraryItem.image}`} alt={itineraryItem.title} className="w-full h-32 object-cover mb-2" />
                    <h2 className="text-lg font-semibold">{itineraryItem.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{itineraryItem.duration} days</p>
                    {/* Add more details as needed */}
                    <Link to={`/update-itinerary/${itineraryItem.id}`} className="text-blue-500 hover:underline">Edit</Link>
                </div>
            ))}
        </div>
    );
}
