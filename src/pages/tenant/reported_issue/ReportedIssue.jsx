import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, Paper, CardMedia, Chip } from '@mui/material';
import nyumba from '../../assets/nyumbaicon.svg';
import TicketComponent from '../../components/Ticket';
const baseURL = process.env.REACT_APP_BASE_URL

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

const status = "PENDING "

const RequestDetails = ({ userId, selectedRequest, onViewDetailsClick }) => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        // Fetch repair requests submitted by the logged-in tenant and are pending
        const response = await fetch(`${baseURL}/repairs?r_u_id=${userId}&r_status=${status}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, [userId]);

  const handleTicketClick = (idx) => {
    onViewDetailsClick(idx);
  };

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>

        <Typography variant="h1" gutterBottom>
            Pending Requests
          </Typography>
          <Box sx={{ maxHeight: '70vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Box>
              {pendingRequests.map((request, idx) => (
                <TicketComponent
                  key={idx}
                  {...request}
                  isSelected={selectedRequest.r_id} // Pass isSelected prop
                  handleClick={() => handleTicketClick(idx)}
                  sx={{ marginBottom: "20px" }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper color="red">
            {selectedRequest && (
              <Card sx={{ height: "80vh", display: "flex", flexDirection: "column", border: "1px solid #ccc" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px", flexGrow: "1" }}>
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <CardMedia
                        component="img"
                        image={nyumba}
                        alt={selectedRequest.p_name}
                        height="60"
                        width="60"
                        sx={{ objectFit: "cover", marginRight: "8px" }}
                        style={{ objectFit: "contain" }}
                      />
                      <Typography variant="h8" color="text.secondary" >
                        {selectedRequest.p_name} {selectedRequest.u_name}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip
                      label={selectedRequest.r_status}
                      sx={{
                        backgroundColor: colors[selectedRequest.r_status],
                        color: "#fff",
                        fontSize: 10,
                        marginRight: 1,
                      }}
                      size="small"
                    />
                  </Box>

                  <Chip
                    label={selectedRequest.r_id}
                    sx={{
                      backgroundColor: color[selectedRequest.r_id],
                      color: "#fff",
                      fontSize: 10,
                      marginRight: "8px",
                    }}
                    size="small"
                  />
                  <Typography variant="h4" gutterBottom>
                    {selectedRequest.r_description}
                  </Typography>
                  <Chip
                    label={selectedRequest.r_type}
                    sx={{
                      backgroundColor: typecolors[selectedRequest.r_type],
                      color: "#fff",
                      fontSize: 10,
                    }}
                    size="small"
                  />
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestDetails;
