/* eslint-disable react/prop-types */
import React from 'react'
import { Box, Grid, Typography, Card, CardContent, Paper, CardMedia, } from '@mui/material'
import nyumba from '../../assets/nyumbaicon.svg'
import TicketComponent from '../../components/Ticket'
import { Chip } from '@mui/material'


const typecolors = {
  Electric: "green",
  Plumbing: "blue",
  general: "green",
  Carpentry: "green",
  Painting:"orange",
  Masonary:"orange"
};
const colors = {
  NEW: "#FFC107",
  DONE: "Green",
  ASSIGNED:"Orange",
  INSPECTION: "Orange",
  WIP: "Blue",
  CANCELLED: "red",
};

const color = {
  new: "#FFC107",
}
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
              <Card sx={{ height: "80vh", display: "flex", flexDirection: "column", border: "1px solid #ccc" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px", flexGrow: "1" ,}}>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <CardMedia
                      component="img"
                      image={nyumba}
                      alt={selectedRequest.p_name}
                      height="60" // Set the height to the desired fixed size
                      width="60" // Set the width to the desired fixed size
                      sx={{
                        objectFit: "cover",
                        marginRight: "8px",
                      }}
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

                  {/* <Typography variant="body2" color="text.secondary" noWrap>
                    {selectedRequest.p_name} {selectedRequest.u_name}
                  </Typography> */}
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
}

export default RequestDetails
