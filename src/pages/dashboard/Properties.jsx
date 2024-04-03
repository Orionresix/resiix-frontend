/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import ActionNav from '../../components/ActionNav'
import DragIndicator from '@mui/icons-material/DragIndicator'
import Reorder from '@mui/icons-material/Reorder'
import CloseFullscreen from '@mui/icons-material/CloseFullscreen'
import PropCard from '../../components/PropCard'
import PropertiesEmpty from './PropertiesEmpty'
import AddPropertyForm from '../../components/properties/AddProperty'

const icons = [<Reorder />, <DragIndicator />, <CloseFullscreen />]

const Properties = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5000/properties'; // to be corrected to dynamic
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);

  const handleSubmit = (propertyData) => {
    // Define the URL for the POST request
    const url = 'http://127.0.0.1:5000/properties/create';
    const data = {
      p_name: propertyData.p_name,
      p_num_units: propertyData.p_num_units,
      p_manager_id: propertyData.p_manager_id,
      p_country: propertyData.p_country,
      p_city: propertyData.p_city,
      p_address: propertyData.p_address,
      p_zipcode: propertyData.p_zipcode,
      p_state: propertyData.p_state,
    };
    const options = {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type of the request body
      },
      body: JSON.stringify(data), // Convert data to JSON string for the request body
    };
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add property');
        }
        console.log('Property added successfully');
        console.log('Property added successfully', propertyData);
        setShowAddPropertyForm(false); 
      })
      .catch(error => {
        console.error('Error adding property:', error);
      });
  };

  const handleCancel = () => {
    setShowAddPropertyForm(false); 
  };

  const handleAddPropertyClick = () => {
    setShowAddPropertyForm(true);
  };

  
  return (
    <>
    {setProperties.length > 0 ? (
    <>
    <div>
      <ActionNav title='Properties' icons={icons} onAddClick={handleAddPropertyClick} />
      {showAddPropertyForm && <AddPropertyForm onSubmit={handleSubmit} onCancel={handleCancel}  />}
      </div>

      {!loading && (

      <div className='fluidGrid'>
      
        <PropCard
          properties={properties}
        />
    

      </div>
    )}


      </>
    ) : (
      <PropertiesEmpty />
    )}
  
  </>
  )
}

export default Properties
