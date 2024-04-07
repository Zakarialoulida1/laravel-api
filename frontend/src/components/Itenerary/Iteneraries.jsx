import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../api/axios';
import { Link } from 'react-router-dom';
import Model from 'react-modal';
import AddDestinationModal from '../Destination/AddDestinationModal';
import Swal from 'sweetalert2';

export default function Itineraries() {
    const [itineraries, setItineraries] = useState([]);
    const [message, setMessage] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedItineraryId, setSelectedItineraryId] = useState(null); // State to store the selected itinerary id

    useEffect(() => {
        fetchItineraries();
    }, []);

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
            const response = await axiosClient.delete(`/api/itineraries/${id}`, { headers });
            fetchItineraries();
            setMessageSuccess(response.data.message);
            setTimeout(() => {
                setMessageSuccess('');
            }, 5000);
        } catch (error) {
            setMessage(error.response.data.message);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const addToVisitList = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axiosClient.get(`/api/users/me/itineraries/${id}`, { headers });
            setMessageSuccess(response.data.message);
            setTimeout(() => {
                setMessageSuccess('');
            }, 5000);
        } catch (error) {
            setMessage(error.response.data.message);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const handleAddSuccess = () => {
        setVisible(false)
        Swal.fire({
            icon: 'success',
            title: 'Destinations added successfully',
            showConfirmButton: false,
            timer: 1500 // Automatically close the alert after 1.5 seconds
        });
    };

    return (
        <>
            {message && (
                <h1 className='mx-auto w-fit py-4 px-24 m-2 rounded text-white bg-red-500'>{message}</h1>
            )}
            {messageSuccess && (
                <h1 className='mx-auto w-fit py-4 px-24 m-2 rounded text-white bg-green-500'>{messageSuccess}</h1>
            )}
            <div className="grid grid-cols-1 mt-6  my-4  md:grid-cols-2 lg:grid-cols-3 gap-4">
                {itineraries.map(itinerary => (
                    <div key={itinerary.id} className="bg-gray-200 shadow-xl rounded-lg p-4">
                        <img src={`http://127.0.0.1:8000/storage/${itinerary.image}`} alt={itinerary.title} className="w-full h-32 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{itinerary.title}</h2>
                        <p className="text-sm text-gray-500 mb-2">{itinerary.duration} days</p>
                        <Link to={`/update-itinerary/${itinerary.id}`} className="text-blue-500 hover:underline">Edit</Link>
                        <button className='text-red-600' onClick={() => deleteItinerary(itinerary.id)}>Delete</button>
                        <button onClick={() => addToVisitList(itinerary.id)}>Add To Visit List</button>
                        <button onClick={() => {
                            setSelectedItineraryId(itinerary.id); // Set the selected itinerary id
                            setVisible(true);
                        }} className="text-black hover:underline">ADD Destination</button>
                    </div>
                ))}
            </div>

            <Model
                isOpen={visible}
                onRequestClose={() => setVisible(false)}
                style={{
                    overlay: { background: "rgba(0, 0, 0, 0.5)" },
                    content: { width: '50vw', height: '' }
                }}
                ariaHideApp={false} // Opt-out of setting the app element
            >
                <AddDestinationModal itineraryId={selectedItineraryId} onAdd={handleAddSuccess} onClose={() => setVisible(false)} />
                <div className='flex justify-end'>
                    <button className='bg-gray-200 rounded py-2 px-4 text-red-600' onClick={() => setVisible(false)}>Close Modal</button>
                </div>
            </Model>

        </>
    );
}
