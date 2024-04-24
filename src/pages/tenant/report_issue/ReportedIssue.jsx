import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";
import logo from "../../../assets/Resiix-logo.svg";
import AddRequest from "./ReportIssue";
import Divider from '@mui/material/Divider';

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

// const color = {
//   new: "#FFC107",
// };

const status = "PENDING";
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
    fetch(`${baseURL}/tenantinfo?u_id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUnitDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [userId]);

  const [showAddrequestForm, setShowAddrequestForm] = useState(false);
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(
          `${baseURL}/repairs?r_u_id=${userId}&r_status=${status}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data)
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
    <>
      <Box sx={{ textAlign: 'left' }}>
        <img src={logo} alt="Resiix Logo" style={{ height: 'auto', width: '35%', maxWidth: '300px' }} />
      </Box>
      <Divider sx={{ width: '100%' }} />
      <Box sx={{ minHeight: "80vh", position: "relative" }}>

        <Grid item xs={12}>
          <Typography variant="h5" align="left" mt={2} mb={4}>
            {!loading && unitDetails && (
              <>Welcome : {unitDetails.tenant_name}</>
            )}
          </Typography>

          <span>
            <Fab
              color="#00B286" // Change the color prop to "success" for green color
              aria-label="add"
              onClick={handleAddRequestClick}
              sx={{
                position: "fixed",
                bottom: 58,
                right: 24,
                width: 72,
                height: 72,
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              }}
            >

              <AddIcon sx={{ fontSize: 32 }} />
            </Fab>

            <Typography variant="h6" align="left" mt={2} mb={4}>
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

        <Grid display="flex" flexDirection="column" gap="1rem">
          {pendingRequests.map((request) => (
            <Card
              // variant="outlined"
              sx={{
                height: "auto",
                // display: "flex",
                // flexDirection: "column",
                borderColor: 'primary.main',
                border: '1px solid #e0e0e0',
              }}
              key={request.r_id}
            >
              {/* <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                      flexGrow: "1",
                    }}
                  >
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
                    label={`#RQ${request.r_id}`}
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
                      backgroundColor: typecolors[request.r_type],
                      color: "#fff",
                      fontSize: 10,
                    }}
                    size="small"
                  />
                </CardContent> */}

              <CardContent>
                <Box display="flex" justifyContent="space-between" >
                  <Typography variant="caption" gutterBottom>
                    WO-TKT:{request.r_id}
                  </Typography>
                  <Box mb={1}>
                    <Chip
                      label={request.r_status}
                      sx={{
                        backgroundColor: colors[request.r_status],
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
                    {request.r_description}
                  </Typography>
                  <Box>
                    <Chip
                      label={request.r_type}
                      sx={{
                        backgroundColor: typecolors[request.r_type],
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
                    {request.p_name} -- {request.u_name}
                  </Typography>
                </Box>
              </CardContent>


            </Card>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RequestDetails;
