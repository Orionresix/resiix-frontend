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
import AddworkorderForm from '../../components/workorder/Addworkorder'
import { Typography} from '@mui/material'
import Loader from '../../components/loader'

const RepairRequests = () => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const [currentView, setCurrentView] = useState('TableView') // Initial view state


  const tickets = [
    { id: 1, title: 'Task 1', status: 'new' },
    { id: 2, title: 'Task 2', status: 'progress' },
    {
      ticketNumber: 1,
      description: 'Description 1',
      status: 'newwww',
      date: '2023-12-01',
      title: 'Request title',
    },
  ]

  const [properties, setProperties] = useState([]);
  const [uniqueProperties, setUniqueProperties] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch(`${baseURL}/properties/units`) // Replace with your actual backend API URL
      .then(response => response.json())
      .then(data => {
        // Extract properties and units from the fetched data
        const properties = data.map(item => ({
          p_id: item.p_id,
          p_name: item.p_name,
          u_id: item.u_id,
          u_name:  item.u_name
        }));
        setProperties(properties);

        const uniqueProperties = properties.reduce((unique, current) => {
            // Check if the current property ID is already in the unique array
            if (!unique.some(property => property.p_id === current.p_id)) {
              unique.push(current);
            }
            return unique;
          }, []);
          setUniqueProperties(uniqueProperties);
        

         
          
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [groupedrepairdata, setGroupedRepairdata] = useState([]);
  const [repairdata, setRepairdata] = useState([]);
  const [uniqueType, setUniquetype] = useState([]);
  const [uniquepriorities, setUniquepriority] = useState([]);
  const [uniquestatuses, setUniquestatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const onhandlefilterClick = (selectedFilter, value)=>{
    setFilterType(selectedFilter);
    setFilterValue(value);
  };

useEffect(() => {
  // Fetch data from backend API
  fetch(`${baseURL}/repairs?${filterType}=${filterValue}`)
    .then(response => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setRepairdata(data);
      setLoading(false); // Set loading to false after data is fetched
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false if an error occurs
    });
}, [filterType ,filterValue]);
  
  useEffect(() => {
    // Fetch data from backend API
    fetch(`${baseURL}/repairs`)
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

        const typefilters = data.map(item => ({
          r_type: item.r_type
        }));
        const uniquetypes = typefilters.reduce((unique, current) => {
            // Check if the current property ID is already in the unique array
            if (!unique.some(item => item.r_type === current.r_type)) {
              unique.push(current);
            }
            return unique;
          }, []);
          setUniquetype(uniquetypes)

          const priorityfilters = data.map(item => ({
            r_priority: item.r_priority,
            r_status: item.r_status,
          }));
          const priorities = priorityfilters.reduce((unique, current) => {
              // Check if the current property ID is already in the unique array
              if (!unique.some(item => item.r_priority === current.r_priority)) {
                unique.push(current);
              }
              return unique;
            }, []);
            setUniquepriority(priorities)

            const statusfilters = data.map(item => ({
              r_status: item.r_status,
            }));
            const status = statusfilters.reduce((unique, current) => {
                // Check if the current property ID is already in the unique array
                if (!unique.some(item => item.r_status === current.r_status)) {
                  unique.push(current);
                }
                return unique;
              }, []);
              setUniquestatus(status)
  

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
        <RepairsTable    groupeddata={groupedrepairdata} repairdata={repairdata} onAddClick={handleAddWorkorderClick}  
        onViewDetailsClick={handleViewDetailsClick}  />
        )}

{ loading && (<Loader/> )}
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
    ) : (<>
      <Reorder onClick={() => handleIconClick(0)} />
    
      </>
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
        return <RequestDetails tickets= {tickets} repairdata={repairdata} selectedrequest={selectedTicket}
        onViewDetailsClick={handleViewDetailsClick} onselectClick={handleSelectRepairClick}  /> // Replace with actual rendering logic for RequestDetails
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

  const handleCancelWorkorder = ()=>{
    setShowAddworkorderForm(false);
  }
 
  const [showAddworkorderForm, setShowAddworkorderForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([])
  // const [selectedrequest, setSelectedRequest] = useState([])
  const handleAddWorkorderClick = (rowIndex) => {
    setShowAddworkorderForm(true);
    setSelectedTicket(rowIndex)
  };
  const handleWorkorderSubmit =  () =>{
    setShowAddrepairForm(false); 
  }

  
  
  const handleViewDetailsClick = (rowIndex) => {
    setCurrentView('RequestDetails')
    setSelectedTicket(rowIndex)
  };
  const handleSelectRepairClick = (rowIndex) => {
    setSelectedTicket(rowIndex)
  };

  console.log(selectedTicket)

  const handleSubmit = (propertyData) => {
    // Define the URL for the POST request
    const url = `${baseURL}/repairs/create`;
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
    <Typography variant="h5" sx={{ color: '#00B286', fontWeight: 'bold' }}>
    Maintenance requests
      </Typography>

      <ActionNav  icons={icons}  onAddClick ={handleAddRepairClick} onfilterClick={onhandlefilterClick}
       icontitle='New Request' uniqueProperties={uniqueProperties}  uniqueType={uniqueType}
       uniquepriorities={uniquepriorities} uniquestatuses={uniquestatuses} />

      <div className="modal-container">
          <div className="modal-content">
          {showAddrepairForm &&  <AddrepairForm onSubmit={handleSubmit} onCancel={handleCancel}
           properties={properties}  uniqueProperties={uniqueProperties}/>}
          </div>
        </div>

        <div className="modal-container">
          <div className="modal-content">
          {showAddworkorderForm &&  <AddworkorderForm onSubmit={handleWorkorderSubmit} onCancel={handleCancelWorkorder}
           properties={properties}  uniqueProperties={uniqueProperties} selectedrequest={selectedTicket}
           repairdata={repairdata}  />}
          </div>
        </div>

        

      {renderView()}
    </>
  )
}

export default RepairRequests
