import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Chip, Grid, Modal } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";
import DetailModal from '../completework/CompleteWork';
import logo from '../../../assets/Resiix-logo.svg'
import Divider from '@mui/material/Divider';

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

const StartWork = () => {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.REACT_APP_BASE_URL
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch assigned tasks from the API
    const fetchAssignedTickets = async () => {
      try {
        const response = await fetch(`${baseURL}/work_orders`);
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid white',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  }

  const handleCardClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Box>
        <Box sx={{ textAlign: 'left' }} >
          <img src={logo} alt="Resiix Logo" style={{ height: 'auto', width: '35%', maxWidth: '300px' }} />
        </Box>
     <Divider sx={{ width: '100%' }} />
         <Typography variant="h5" align="left" mt={2} mb={4}>Welcome Wachira</Typography>
        <Typography variant="h6" align="left" mt={2} mb={4}>Work Orders</Typography>
        <Grid display="flex" flexDirection="column" gap="1rem">
          {assignedTickets.map(ticket => (
            <Card
              key={ticket.r_id}
              variant="outlined"
              onClick={() => handleCardClick(ticket.wo_id)}
              sx={{
                cursor: 'pointer',
                ...(selectedTicket === ticket.wo_id && {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                }),
              }}
            >
              <CardContent>
                <Box display="flex"  justifyContent="space-between" >
                  <Typography variant="caption" gutterBottom>
                    WO-TKT:{ticket.wo_id}
                  </Typography>
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
                </Box>
                <Box display="flex" justifyContent="space-between" flexDirection="column">
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
                  <Box>
                    <Chip
                      label={ticket.r_type}
                      sx={{
                        backgroundColor: typecolors[ticket.r_type],
                        color: "#fff",
                        fontSize: 10,
                        marginBottom: "8px",
                      }}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <PlaceOutlined />
                  <Typography variant="caption">
                    {ticket.p_name} -- {ticket.u_name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box sx={style}>
              <Typography variant="h6" mb={5}>Complete Work Order</Typography>
              <DetailModal selectedticketid={selectedTicket} assignedTickets={assignedTickets} onClose={handleCloseModal} />
            </Box>
          </Modal>
        </Grid>
      </Box>
    </>
  );
};

export default StartWork;
// import AddRequest from "./ReportIssue";