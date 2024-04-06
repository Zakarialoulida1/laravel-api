import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../api/axios';
import { Link } from 'react-router-dom';

export default function Itineraries() {
    const [itineraries, setItineraries] = useState([]);
    const [message,setMessage]=useState('');
    useEffect(() => {
        fetchItineraries();
    }, []); // Empty dependency array to fetch data only once when component mounts

    const fetchItineraries = async () => {
        try {
            const response = await axiosClient.get('api/itineraries');
            setItineraries(response.data);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    const deleteItinerary = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response= await axiosClient.delete(`/api/itineraries/${id}`, { headers });
            // After deletion, refetch the itineraries to update the UI

            fetchItineraries();
        } catch (error) {
          setMessage(error.response.data.message);
        }
    };

    return <>
      {message && (
                <h1 className='mx-auto w-fit py-4 px-24 m-2 rounded text-white bg-red-500'>{message}</h1>
            )}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {itineraries.map(itinerary => (
                <div key={itinerary.id} className="bg-white shadow rounded-lg p-4">
                    <img src={`http://127.0.0.1:8000/storage/${itinerary.image}`} alt={itinerary.title} className="w-full h-32 object-cover mb-2" />
                    <h2 className="text-lg font-semibold">{itinerary.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{itinerary.duration} days</p>
                    <Link to={`/update-itinerary/${itinerary.id}`} className="text-blue-500 hover:underline">Edit</Link> 
                    <button className='text-red-600' onClick={() => deleteItinerary(itinerary.id)}>Delete</button>
                </div>
            ))}
        </div>
        </>
    
}
