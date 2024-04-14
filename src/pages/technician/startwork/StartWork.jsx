import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link from React Router\
import DetailModal from '../completework/CompleteWork'
const baseURL = 'https://orionbackend-1.onrender.com';

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
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const technicianId = 1; // Example technician ID

  useEffect(() => {
    // Fetch assigned tasks from the API
    const fetchAssignedTickets = async () => {
      try {
        const response = await fetch(`${baseURL}/work_orders?wo_assigned_to=${technicianId}`);
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

  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);

  };



  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div>
   {showTicketDetails && (
    <DetailModal selectedrequestid={selectedTicket} assignedTickets={assignedTickets} />
   ) }

      {assignedTickets.map(ticket => (
        <Card key={ticket.r_id} sx={{ marginBottom: "10px", maxWidth: "400px", margin: "auto" }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" flexDirection="column">
              <Typography variant="caption" gutterBottom>
                TKT-{ticket.r_id}
              </Typography>
              <Box display="flex" justifyContent="space-between" flexDirection="column">
                <Box mb={1}>
                  <Chip
                    label={ticket.r_status}
                    sx={{
                      backgroundColor: colors[ticket.r_status],
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
            <Box mt={2} display="flex" justifyContent="center">
              {/* Button to redirect to complete work order page */}
              <Button component={Link} 
              onClick={() => handleViewTicket(ticket.r_id)}
               variant="contained">Complete Work</Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedTicket && `TKT-${selectedTicket.r_id}`}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedTicket && selectedTicket.r_description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParentComponent;
