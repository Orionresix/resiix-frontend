/* eslint-disable no-undef */
import React, { useEffect, useState,  } from 'react';
import { useLocation,  } from 'react-router-dom';
import Stats from '../../components/Dashboard/Stats'
import { Box, Grid, Link,Button, } from '@mui/material'
import Typography from '@mui/material/Typography'
import TicketComponent from '../../components/Ticket'
import {
  AcUnit,
  Bolt,
  Handyman,
  Plumbing,
  SentimentVeryDissatisfied,
} from '@mui/icons-material';
import Loader from '../../components/loader'
// import {UserContext} from '../../components/layout/userContext.js'



const DashboardHome = () => {
  const baseURL = process.env.REACT_APP_BASE_URL ;
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // const { setLoggedInUser } = useContext(UserContext);





  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetch( `${baseURL}/user_details`)
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
  //   const apiUrl = `${baseURL}/user_details`; // Replace with your actual backend API URL

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


  const [counts, setCounts] = useState([
    { title: 'Total maintenance request', data: <>   { loading && (<Loader/> )}</> },
    { title: 'Total open work orders', data: <>   { loading && (<Loader/> )} </> },
    { title: 'Overdue requests', data: <> { loading && (<Loader/> )}</> },
    { title: 'Total expenses', data: <>   { loading && (<Loader/> )} </> }
]);

useEffect(() => {
    fetchCounts();
}, []);

const fetchCounts = () => {
  const apiUrl = `${baseURL}/work_orders/get_request_count`; // Replace with your actual backend API URL

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
                { title: 'Electrical', data: data.totalMaintenanceRequest, icon:<Bolt sx={{ fontSize: '60px', color: 'red' }} />  },
                { title: 'Plumbing', data: data.totalOpenWorkOrders,icon: <Plumbing sx={{ fontSize: '60px', color: 'blue' }} />  },
                { title: 'General repairs ', data: data.overdueRequests, icon:<Handyman sx={{ fontSize: '60px', color: 'purple' }} /> },
                { title: 'Air conditioning', data: data.totalExpenses,icon: <AcUnit sx={{ fontSize: '60px', color: 'green' }} />  },
                { title: 'Overdue', data: data.totalExpenses,icon:  <SentimentVeryDissatisfied sx={{ fontSize: '60px', color: 'orange' }} />  }
              
            ];
            setCounts(updatedCounts);
        })
        .catch(error => {
            console.error('Error fetching counts:', error);
        });
};


  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    // Define the URL of your backend API endpoint
    const apiUrl = `${baseURL}/repairs/`; // Replace with your actual backend API URL

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
    <>
      <Typography variant="h5" sx={{ color: '#00B286', fontWeight: 'bold', marginBottom: '20px' }}>
    Maintenance requests
      </Typography>
        <Stats stats={counts} />
      <Box sx={{  display: 'flex', flexDirection: 'column',  }}>  
       <Box>
       {userData ? (
                  <Box>
                      <p>welcome -  {userData.name} </p>
                  </Box>
              ) : (
                <Typography variant="h5" sx={{ color: '#00B286', fontWeight: 'bold', marginTop: '50px' }}>
                Daily Requests
                  </Typography>
              )}
       </Box>
  
  
        <Box className='dailyRequests'>
          <Box>
          {!loading && (
            <>
            <Grid container spacing={2}>
              {tickets.map((ticket, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <TicketComponent {...ticket} xs={6} />
                </Grid>
              ))}
            </Grid>
  
               <Box alignSelf={'flex-end'} marginTop='20px'>
               <Link href='/dashboard/requests'>
                 <Button variant='outlined'>View More</Button>
               </Link>
             </Box>
             </>
  
          )}

{ loading && (<Loader/> )}
          </Box>
        </Box>
  
        </Box>

    </>
   
  )
}

export default DashboardHome