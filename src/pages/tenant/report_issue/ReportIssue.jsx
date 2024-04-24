/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import "./ReportIssue.css";
import { toast, Toaster } from "react-hot-toast";

import {
  TextField,
  Box,
  MenuItem,
  Button,
} from "@mui/material";
// import TenantContext from '../tenantContext.js'

const ReportIssue = ({ unitId, onSubmit, onCancel }) => {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [mantainanceType, setMantainanceType] = useState("Electrical");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlereportIssue = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
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
        setIsLoading(true); // Set loading state to true
        if (!response.ok) {
          throw new Error("Failed to add repair request");
        }
        onSubmit();
        toast.success("Your Request has been delivered successfully.");
      })
      .catch((error) => {
        setIsLoading(true); // Set loading state to true
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
    <>
      {unitId && (
        <form onSubmit={handlereportIssue} className="complete-form">
          <TextField
            required
            fullWidth
            label="Preferred contact"
            name="r_phone"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />

          <TextField
            required
            fullWidth
            label="Description"
            name="r_description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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

          <Box display="flex" gap="1rem" justifyContent="end">
            <Button
              onClick={onCancel}
              variant="contained"
              color="primary"
              style={{ width: "40%" }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "40%" }}
              disabled={isLoading}
            >
               {isLoading ? 'Sending...' : 'Submit'}
              
            </Button>
          </Box>

          <Toaster
            toastOptions={{
              style: {
                background: "green",
                color: "#fff",
              },
            }}
          />
        </form>
      )}
    </>
  );
};

export default ReportIssue;
