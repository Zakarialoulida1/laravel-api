import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosClient } from '../../api/axios';
import { useParams } from 'react-router-dom';

const UpdateItenerary = () => {
    const {id} =useParams() 
    console.log(id);
  const [itineraryData, setItineraryData] = useState({
    title: '',
    category_id: '',
    duration: '',
    image: ''
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    // Fetch itinerary data
    const fetchItineraryData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        const response = await axiosClient.get('api/itineraries/'+id+'/edit', { headers });
        setItineraryData(response.data.itinerary);
      } catch (error) {
        console.error('Failed to fetch itinerary data:', error.response.data.message);
        setError(error.response.data.message);
      }
    };

    // Fetch categories
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

    fetchItineraryData();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItineraryData({ ...itineraryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axiosClient.put(`/api/itineraries/${id}`, itineraryData, { headers });
      console.log(response.data);
      // Handle success response here
    } catch (error) {
      console.error('Failed to update itinerary:', error.message);
      // Handle error response here
    }
  };

  return (


    <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
      <input type="text" name="title" value={itineraryData.title} onChange={handleChange} placeholder="Title" />
      
      {/* Category select */}
      <select name="category_id" value={itineraryData.category_id} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      
      <input type="number" name="duration" value={itineraryData.duration} onChange={handleChange} placeholder="Duration" />
      <input type="text" name="image" value={itineraryData.image} onChange={handleChange} placeholder="Image URL" />
      
      <button type="submit">Update Itinerary</button>
    </form>
  );
};

export default UpdateItenerary;
