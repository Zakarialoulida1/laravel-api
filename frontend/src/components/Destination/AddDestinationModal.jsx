import React, { useState } from 'react';
import { axiosClient } from '../../api/axios';

export default function AddDestinationModal({ itineraryId, onAdd }) {
    const [destinations, setDestinations] = useState([{ name: '', accommodation: '', places_to_visit: '', activities: [] }]);

const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...destinations];
    if (name === 'activities') {
        // If the field is activities, split the string value into an array
        list[index][name] = value.split(',').map(activity => activity.trim());
    } else {
        // Otherwise, directly set the value
        list[index][name] = value;
    }
    setDestinations(list);
};



    
    const handleAddDestination = () => {
        setDestinations([...destinations, { name: '', accommodation: '', places_to_visit: '', activities: [] }]);
    };

    const handleRemoveDestination = index => {
        const list = [...destinations];
        list.splice(index, 1);
        setDestinations(list);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            console.log(destinations);
            await axiosClient.post(`/api/itineraries/${itineraryId}/destinations`, { destinations }, { headers });
            onAdd();
        } catch (error) {
            console.error('Error adding destinations:', error);
        }
    };

    return (
        <div className="modal-content">
            <form onSubmit={handleSubmit}>
                {destinations.map((destination, index) => (
                    <div key={index}>
                        <label>Name:</label>
                        <input type="text" name="name" value={destination.name} onChange={e => handleInputChange(index, e)} required />
                        <label>Accommodation:</label>
                        <input type="text" name="accommodation" value={destination.accommodation} onChange={e => handleInputChange(index, e)} required />
                        <label>Places to Visit:</label>
                        <input type="text" name="places_to_visit" value={destination.places_to_visit} onChange={e => handleInputChange(index, e)} required />
                        <label>Activities:</label>
                        <input type="text" name="activities" value={destination.activities} onChange={e => handleInputChange(index, e)} required />
                        {index !== 0 && <button type="button" onClick={() => handleRemoveDestination(index)}>Remove</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddDestination}>Add Destination</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
