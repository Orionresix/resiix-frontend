import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Chip, Button, Grid, } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link from React Router\
import DetailModal from '../completework/CompleteWork'

const colors = {
  NEW: "#FFC107",
  DONE: "Green",
  ASSIGNED: "Orange",
  INSPECTION: "Orange",
  WIP: "Blue",
  CANCELLED: "red",
};
const typecolors = {
  Electric: "red",
  Plumbing: "blue",
  Carpentry: "indigo",
  Painting: "orange",
  Masonary: "orange",
};

const ParentComponent = () => {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.REACT_APP_BASE_URL
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  const technicianId = 1; // Example technician ID
  const wo_status = 'ASSIGNED';

  useEffect(() => {
    // Fetch assigned tasks from the API
    const fetchAssignedTickets = async () => {
      try {
        const response = await fetch(`${baseURL}/work_orders?wo_assigned_to=${technicianId}&wo_status=${wo_status}`);
        if (!response.ok) {
          throw new Error("Failed to fetch assigned tickets");
        }
        const data = await response.json();
        setAssignedTickets(data); // Assuming data is an array of assigned tickets
      } catch (error) {
        console.error("Error fetching assigned tickets:", error);
      }
    };

    fetchAssignedTickets();
  }, []);


  const [isDropdownOpen, setIsDropdownOpen] = useState(Array(assignedTickets.length).fill(false));
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);

    setIsDropdownOpen((prevState) => {
      const newDropdowns = [...prevState];
      newDropdowns[ticket] = !newDropdowns[ticket];
      return newDropdowns;
    });

  };


  return (
    <Grid>
      {assignedTickets.map(ticket => (
        <Card key={ticket.r_id} >
          <CardContent>
            <Box display="flex" justifyContent="space-between" flexDirection="column">
              <Typography variant="caption" gutterBottom>
                WO-TKT:{ticket.wo_id}
              </Typography>
              <Box display="flex" justifyContent="space-between" flexDirection="column">
                <Box mb={1}>
                  <Chip
                    label={ticket.wo_status}
                    sx={{
                      backgroundColor: colors[ticket.wo_status],
                      color: "#fff",
                      fontSize: 10,
                    }}
                    size="small"
                  />
                </Box>
                <Box>
                  <Chip
                    label={ticket.r_type}
                    sx={{
                      backgroundColor: typecolors[ticket.r_type],
                      color: "#fff",
                      fontSize: 10,
                    }}
                    size="small"
                  />
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                margin: "8px 0 12px 0",
                lineHeight: "1.2",
                maxHeight: "1.2em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                height: "60px",
              }}
            >
              {ticket.r_description}
            </Typography>
            <Box display="flex" alignItems="center">
              <PlaceOutlined />
              <Typography variant="caption">
                {ticket.p_name} -- {ticket.u_name}
              </Typography>
            </Box>

<Box>

            {isDropdownOpen[ticket.wo_id] && (
             <> 
             <DetailModal selectedticketid={selectedTicket}  assignedTickets={assignedTickets} onClose={handleViewTicket} />
            </>

          )}

</Box>

{!isDropdownOpen[ticket.r_id] && (
  <Box mt={2} display="flex" justifyContent="center">
  {/* Button to redirect to complete work order page */}
  <Button component={Link} 
  onClick={() => handleViewTicket(ticket.wo_id)}
   variant="contained">View Details</Button>
</Box>
)}

            



          </CardContent>




        </Card>
      ))}
  




    </Grid>
  );
};

export default ParentComponent;
