/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import nyumba from "../../../assets/nyumbaicon.svg";
import AddRequest from "./ReportIssue";
// import TicketComponent from '../../../components/Ticket';

const typecolors = {
  Electric: "green",
  Plumbing: "blue",
  general: "green",
  Carpentry: "green",
  Painting: "orange",
  Masonary: "orange",
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

const status = "NEW";

// eslint-disable-next-line react/prop-types
const RequestDetails = ({ userId }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [pendingRequests, setPendingRequests] = useState([]);
  if (!userId) {
    userId = 1;
  }
  const [loading, setLoading] = useState(true);
  const [unitDetails, setUnitDetails] = useState(null);
  useEffect(() => {
    // Fetch data from backend API
    fetch(`${baseURL}/tenantinfo?u_id=${userId}`)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUnitDetails(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, [userId]);

  console.log(unitDetails);

  const [showAddrequestForm, setShowAddrequestForm] = useState(false);
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        // Fetch repair requests submitted by the logged-in tenant and are pending
        const response = await fetch(
          `${baseURL}/repairs?r_u_id=${userId}&r_status=${status}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    fetchPendingRequests();
  }, [userId, showAddrequestForm]);

  const handleAddRequestClick = () => {
    setShowAddrequestForm(true);
  };
  const handleCancel = () => {
    setShowAddrequestForm(false);
  };
  const handleSubmit = () => {
    setShowAddrequestForm(false);
  };

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            {!loading && unitDetails && (
              <>Welcome : {unitDetails.tenant_name}</>
            )}
          </Typography>

          <span>
            <IconButton
              onClick={handleAddRequestClick}
              sx={{
                border: "1px solid #00B286",
                borderRadius: " 4px",
                padding: "4.5px",
              }}
            >
              <AddIcon sx={{ fontSize: 20, color: "#00b286" }} /> NEW
            </IconButton>

            <Typography variant="h6" gutterBottom sx={{ ml: 4 }}>
              Pending Requests
            </Typography>
          </span>
        </Grid>

        {showAddrequestForm && (
          <AddRequest
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            unitId={userId}
          />
        )}

        <Grid item xs={12}>
          <Paper color="red">
            {pendingRequests.map((request) => (
              <Card
                sx={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                }}
                key={request.r_id}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                      flexGrow: "1",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={nyumba}
                        alt={request.p_name}
                        height="60"
                        width="60"
                        sx={{ objectFit: "cover", marginRight: "8px" }}
                        style={{ objectFit: "contain" }}
                      />
                      <Typography variant="h8" color="text.secondary">
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
                    label= {`#RQ${request.r_id}`}
                    sx={{
                      backgroundColor: color[request.r_id],
                      color: "#00b286",
                      fontSize: 10,
                      marginRight: "8px",
                    }}
                    size="small"
                  />
                  <Typography variant="h6" gutterBottom>
                    {request.r_description}
                  </Typography>
                  <Chip
                    label={request.r_type}
                    sx={{
                      // eslint-disable-next-line react/prop-types
                      backgroundColor: typecolors[request.r_type],
                      color: "#fff",
                      fontSize: 10,
                    }}
                    size="small"
                  />
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestDetails;
