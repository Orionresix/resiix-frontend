/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Paper, CardMedia, Chip } from '@mui/material';
import nyumba from '../../../assets/nyumbaicon.svg';
// import TicketComponent from '../../../components/Ticket';

const typecolors = {
  Electric: "green",
  Plumbing: "blue",
  general: "green",
  Carpentry: "green",
  Painting: "orange",
  Masonary: "orange"
};

const colors = {
  NEW: "#FFC107",
  DONE: "Green",
  ASSIGNED: "Orange",
  INSPECTION: "Orange",
  WIP: "Blue",
  CANCELLED: "red",
};

const color = {
  new: "#FFC107",
};

// eslint-disable-next-line react/prop-types
const RequestDetails = ({ userId }) => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const [completedRequests, setCompletedRequests] = useState([]);
  if (!userId) {
    userId = 1
  }

  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        // Fetch repair requests submitted by the logged-in tenant and are done
        const response = await fetch(`${baseURL}/repairs?r_u_id=${userId}&r_status=DONE`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCompletedRequests(data);
      } catch (error) {
        console.error('Error fetching completed requests:', error);
      }
    };

    fetchCompletedRequests();
  }, [userId]);

  // const handleTicketClick = (idx) => {
  //   onViewDetailsClick(idx);
  // };

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Grid container spacing={3}>
        
        <Typography variant="h1" gutterBottom>
            Completed requests
          </Typography>

{completedRequests.map(request => (
        <Grid item xs={12}>
        <Paper color="red">


            <Card sx={{ height: "80vh", display: "flex", flexDirection: "column", border: "1px solid #ccc" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px", flexGrow: "1" }}>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <CardMedia
                      component="img"
                      image={nyumba}
                      alt={request.p_name}
                      height="60"
                      width="60"
                      sx={{ objectFit: "cover", marginRight: "8px" }}
                      style={{ objectFit: "contain" }}
                    />
                    <Typography variant="h8" color="text.secondary" >
                      {request.p_name} {request.u_name}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <Chip
                    label={request.r_status}
                    sx={{
                      backgroundColor: colors[request.r_status],
                      color: "#fff",
                      fontSize: 10,
                      marginRight: 1,
                    }}
                    size="small"
                  />
                </Box>

                <Chip
                  label={request.r_id}
                  sx={{
                    backgroundColor: color[request.r_id],
                    color: "#fff",
                    fontSize: 10,
                    marginRight: "8px",
                  }}
                  size="small"
                />
                <Typography variant="h4" gutterBottom>
                  {request.r_description}
                </Typography>
                <Chip
                  label={request.r_type}
                  sx={{
                    backgroundColor: typecolors[request.r_type],
                    color: "#fff",
                    fontSize: 10,
                  }}
                  size="small"
                />
              </CardContent>
            </Card>
        
        </Paper>
      </Grid>
))}






      </Grid>
    </Box>
  );
};

export default RequestDetails;