import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Stats from '../../components/Dashboard/Stats'
import { Box, Grid } from '@mui/material'
import DonutChartComponent from '../../components/DonutChart'
import TicketComponent from '../../components/Ticket'


const DashboardHome = () => {


  const location = useLocation();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/user_details')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Set the user data in state
        setUserData(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [location.search]);

  // const [userDetails, setUserDetails] = useState(null);
  // const getToken = () => {
  //   // Retrieve JWT token from localStorage
  //   const token = localStorage.getItem('jwtToken');
  //   return token;
  // };
  // console.log(getToken());
  // useEffect(() => {
  //   const apiUrl = 'http://127.0.0.1:5000/user_details'; // Replace with your actual backend API URL

  //   // Fetch data from the backend API
  //   fetch(apiUrl
  //     , {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         // Include JWT token in the Authorization header
  //         'Authorization': `Bearer ${getToken()}`
  //     }
  // }
  // )
  //     .then(response => {
  //       // Check if the response is successful
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       // Parse the JSON response
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Set the fetched data to the state
  //       setUserDetails(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       // Handle any errors that occurred during the fetch
  //       console.error('Error fetching user details:', error);
  //       setLoading(false);
  //     });
  // }, []);



  const propertyStats = [
    { id: 0, value: 20, label: 'Property A' },
    { id: 1, value: 15, label: 'Property B' },
  ]

  const [counts, setCounts] = useState([
    { title: 'Total maintenance request', data: 'Loading...' },
    { title: 'Total open work orders', data: 'Loading...' },
    { title: 'Overdue requests', data: 'Loading...' },
    { title: 'Total expenses', data: 'Loading...' }
]);

useEffect(() => {
    fetchCounts();
}, []);

const fetchCounts = () => {
  const apiUrl = 'http://127.0.0.1:5000/work_orders/get_request_count'; // Replace with your actual backend API URL

  // Fetch data from the backend API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const updatedCounts = [
                { title: 'Total maintenance request', data: data.totalMaintenanceRequest },
                { title: 'Total open work orders', data: data.totalOpenWorkOrders },
                { title: 'Overdue requests', data: data.overdueRequests },
                { title: 'Total expenses', data: data.totalExpenses }
            ];
            setCounts(updatedCounts);
        })
        .catch(error => {
            console.error('Error fetching counts:', error);
        });
};


  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Define the URL of your backend API endpoint
    const apiUrl = 'http://127.0.0.1:5000/work_orders/'; // Replace with your actual backend API URL

    // Fetch data from the backend API
    fetch(apiUrl)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        // Set the fetched data to the state
        setTickets(data);
        setLoading(false);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts


  return (
    <div>
      <Stats stats={counts} />
     <div>
     {userData ? (
                <div>
                    <p>welcome -  {userData.name} </p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
     </div>


      <Box className='dailyRequests'>
        <Box>
        {!loading && (
          <Grid container spacing={2}>
            {tickets.map((ticket, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TicketComponent {...ticket} xs={6} />
              </Grid>
            ))}
          </Grid>
        )}
          <Box display='flex' justifyContent='space-between'>
            <DonutChartComponent
              data={propertyStats}
              title='Maintenance Request by property'
            />
            <DonutChartComponent
              data={propertyStats}
              title='Total Maintenance costs'
            />
          </Box>
        </Box>
       
      </Box>
    </div>
  )
}

export default DashboardHome
