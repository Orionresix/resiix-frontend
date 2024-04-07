/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Grid, Typography, Card, CardContent, Paper, CardMedia } from '@mui/material'
import nyumba from '../../assets/nyumbaicon.svg'
import TicketComponent from '../../components/Ticket'

const RequestDetails = ({ repairdata, selectedrequest, onViewDetailsClick }) => {

  // const [selectedTicket, setSelectedTicket] = useState([])

  const selectedRequest = repairdata.find(request => request.r_id === selectedrequest);

  const handleTicketClick = (idx) => {
    onViewDetailsClick(idx);
  }

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              maxHeight: '70vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}>

<Box>
            {repairdata.map((order, idx) => (      
              <TicketComponent
                key={idx}
                {...order}
                isSelected={selectedRequest.r_id} // Pass isSelected prop
                handleClick={() => handleTicketClick(idx)}
              />
            ))}

</Box>

          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{ height: "100%" }}
          className="requestDetailsPane"
        >
          <Paper color="red">
            {selectedRequest && (
              <Card sx={{ height: "80vh" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {selectedRequest.r_id}
                  </Typography>

                  <CardMedia
                    component="img"
                    image={nyumba}
                    alt={selectedRequest.p_name}
                    height="40"
                    width="40"
                    sx={{ marginRight: "1rem" }} // Add margin to separate from the content on the right
                  />

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {selectedRequest.p_name} {selectedRequest.u_name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    {selectedRequest.r_description}
                  </Typography>
                 
                  <Typography variant="body1" gutterBottom>
                    Date: {selectedRequest.r_type}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Status: {selectedRequest.r_status}
                  </Typography>

                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RequestDetails
