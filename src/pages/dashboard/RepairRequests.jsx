/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import { React, useState, useEffect } from 'react'
import RepairsTable from '../../components/repairsTable'
import Box from '@mui/material/Box'
import ActionNav from '../../components/ActionNav'
import DragIndicator from '@mui/icons-material/DragIndicator'
import Reorder from '@mui/icons-material/Reorder'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault' // Import DisabledByDefault icon
import RequestDetails from './RequestDetails'
import AddrepairForm from '../../components/Repairs/Addrepair'

const RepairRequests = () => {
  const [currentView, setCurrentView] = useState('TableView') // Initial view state


  const tickets = [
    { id: 1, title: 'Task 1', status: 'new' },
    { id: 2, title: 'Task 2', status: 'progress' },
    {
      ticketNumber: 1,
      description: 'Description 1',
      status: 'new',
      date: '2023-12-01',
      title: 'Request title',
    },
  ]

  const [groupedrepairdata, setGroupedRepairdata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data from backend API
    fetch('http://127.0.0.1:5000/repairs/')
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Group rows by r_p_id
        const groupedData = data.reduce((acc, row) => {
          const { r_p_id, ...rest } = row;
          if (!acc[r_p_id]) {
            acc[r_p_id] = { property: r_p_id,  orders: [] };
          }
          acc[r_p_id].orders.push(rest);
          return acc;
        }, {});
        setGroupedRepairdata(Object.values(groupedData));

        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  const TableView = () => (
    <>
      <Box>
      {!loading && (
        <RepairsTable    groupeddata={groupedrepairdata}  />
        )}
      </Box>
    </>
  )

  const handleIconClick = (iconIndex) => {
    const newView = iconIndex === 0 ? 'TableView' : 'RequestDetails' // Determine view based on index
    setCurrentView(newView)
  }

  const icons = [
    currentView === 'TableView' ? (
      <DisabledByDefaultIcon />
    ) : (
      <Reorder onClick={() => handleIconClick(0)} />
    ),
    currentView === 'RequestDetails' ? (
      <DisabledByDefaultIcon />
    ) : (
      <DragIndicator onClick={() => handleIconClick(1)} />
    ),
  ]

  const renderView = () => {
    switch (currentView) {
      case 'TableView':
        return <TableView />
      case 'RequestDetails':
        return <RequestDetails tickets= {tickets}     /> // Replace with actual rendering logic for RequestDetails
      default:
        return null
    }
  }
  const [showAddrepairForm, setShowAddrepairForm] = useState(false);
  const handleAddRepairClick = () => {
    setShowAddrepairForm(true);
  };
  const handleCancel = () => {
    setShowAddrepairForm(false); 
  };

  const handleSubmit = (propertyData) => {
    // Define the URL for the POST request
    const url = 'http://127.0.0.1:5000/repairs/create';
    const data = {
      p_name: propertyData.p_name,
      p_id: propertyData.p_id,
      u_id: propertyData.u_id,
      u_name: propertyData.u_name,
      r_description: propertyData.r_description,
      priority: propertyData.r_priority,
      r_type: propertyData.r_type,
      r_img_url: propertyData.r_img_url
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
        console.log('Property added successfully', propertyData);
        setShowAddrepairForm(false); 
      })
      .catch(error => {
        console.error('Error adding property:', error);
      });
  };


  return (
    <>
   
      <ActionNav title='Repair requests' icons={icons}  onAddClick ={handleAddRepairClick} />
      <div className="modal-container">
          <div className="modal-content">
          {showAddrepairForm &&  <AddrepairForm onSubmit={handleSubmit} onCancel={handleCancel}  />}
          </div>
        </div>

      {renderView()}
    </>
  )
}

export default RepairRequests
