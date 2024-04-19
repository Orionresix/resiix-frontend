import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { TextField, Grid, MenuItem, Button, Dialog, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
const ReportIssue = ({ unitId, onSubmit, onCancel }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [mantainanceType, setMantainanceType] = useState("Electrical");
  const [image, setImage] = useState("");
  const [categories, setCategory] = useState([]);

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  useEffect(() => {
    fetch(`${baseURL}/repairs/category`)
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
      <Paper className="complete-issue" sx={{ pt: 4, padding: 4, gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          Pending Requests
        </Typography>
        <form onSubmit={handlereportIssue}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
              <Button variant="contained" color="secondary" onClick={onCancel} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Toaster
          toastOptions={{
            style: {
              background: "green",
              color: "#fff",
            },
          }}
        />
      </Paper>
    </Dialog>
  );
};
ReportIssue.propTypes = {
  unitId: PropTypes.any.isRequired, // Validate unitId as required
  onSubmit: PropTypes.func.isRequired, // Validate onSubmit as a function and required
  onCancel: PropTypes.func.isRequired, // Validate onCancel as a function and required
};


export default ReportIssue;
