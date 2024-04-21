/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./ReportIssue.css";
import { toast, Toaster } from "react-hot-toast";

import { TextField, Grid, MenuItem, Button, Dialog, Paper, Typography } from "@mui/material";
// import TenantContext from '../tenantContext.js'

const ReportIssue = ({ unitId, onSubmit, onCancel }) => {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [mantainanceType, setMantainanceType] = useState("Electrical");
  const [image, setImage] = useState("");

  const handlereportIssue = (e) => {
    e.preventDefault();
    const url = `${baseURL}/repairs/create`;
    const data = {
      u_id: unitId,
      r_description: description,
      r_phone: contactNumber,
      priority: "HIGH",
      r_type: mantainanceType,
      r_img_url: image,
    };
    const options = {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify the content type of the request body
      },
      body: JSON.stringify(data), // Convert data to JSON string for the request body
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add repair request");
        }
        onSubmit();
        toast.success("Your Request has been successfully submitted.");
      })
      .catch((error) => {
        console.error("Error adding repair request:", error);
      });
  };

  const [categories, setCategory] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch(`${baseURL}/repairs/category`) // Replace with your actual backend API URL
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Dialog open={true} onClose={onCancel}>
    <Paper className={'classes.paper'} sx={{ pt: 4, }}>

    <Typography variant="h6" gutterBottom sx={{ ml: 4 }}>
          Pending Requests
        </Typography>
    <form  onSubmit={handlereportIssue}>


    <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Preferred contact"
                name="r_phone"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </Grid>

        <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Description"
                name="r_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

    

        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            fullWidth
            label="Select Maintenance"
            name="r_type"
            value={mantainanceType}
            onChange={(e) => setMantainanceType(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.m_id} value={category.m_name}>
                {category.m_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <Grid item xs={12} sm={6} sx={{ p: 4 }} spacing={4}>
          <span>
            <Button
              variant="contained"
              color="secondary"
              onClick={onCancel}
              sx={{ mr: 2 }}
            >
              cancel
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </span>
        </Grid>

        <Toaster
          toastOptions={{
            style: {
              background: "green",
              color: "#fff",
            },
          }}
        />
      </form>
      </Paper></Dialog>



  




  );
};

export default ReportIssue;
