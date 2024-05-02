import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  Modal,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import logo from "../../../assets/Resiix-logo.svg";
import AddRequest from "./ReportIssue";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

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

const status = "PENDING";

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid white",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  RequestDetails.propTypes = {
    userId: PropTypes.number.isRequired,
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#F5F5F5", dislpay: "flex", width: "100vw", marginLeft: "-20px", position: "fixed", top: "0", zIndex: "1000" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <img
              src={logo}
              alt="Resiix Logo"
              style={{ height: "auto", width: "50%", maxWidth: "300px" }}
            />
            <Avatar sx={{  marginLeft: 'auto', bgcolor: "grey", size: "large",position:"absolute",right:"10px" }}>
              <PersonIcon />
            </Avatar>

          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingTop: "60px" }}>
        <Typography variant="h6" sx={{ ml: 2, color: 'black',marginLeft:"0px"}}>
        {!loading && unitDetails && <>Welcome : {unitDetails.tenant_name}</>}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Box sx={{ minHeight: "80vh", position: "relative" }}>
          <Grid item xs={12}>


            <Typography variant="body1" align="left" mt={2} mb={4}>
              Pending Requests
            </Typography>

            <Fab

              aria-label="add"
              onClick={handleAddRequestClick}
              sx={{
                position: "fixed",
                bottom: 68,
                right: 24,
                width: 72,
                height: 72,
                backgroundColor: "#4FAF89",
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              <AddIcon sx={{ fontSize: 32 }} />
            </Fab>

          </Grid>

          {/* {showAddrequestForm && (
          <AddRequest
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            unitId={userId}
          />
        )} */}

          <Modal open={showAddrequestForm} onClose={handleCancel}>
            <Box sx={style}>
              <Typography variant="h6" mb={5}>
                Add New Request{" "}
              </Typography>
              <AddRequest
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                unitId={userId}
              />
            </Box>
          </Modal>

          <Grid item xs={12}>
            {pendingRequests.map((request) => (
              <Card
                sx={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  marginBottom: "15px",
                  boxShadow: "none",
                }}
                key={request.r_id}
              >
                <CardContent>



                  <Box display="flex" justifyContent="space-between">


                    <Chip
                      label={`RQ${request.r_id}`}
                      sx={{
                        backgroundColor: colors[request.r_id],
                        color: "#00b286",
                        fontSize: 10,
                        marginRight: "8px",
                      }}
                      size="small"
                    />

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
                </CardContent>

              </Card>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default RequestDetails;