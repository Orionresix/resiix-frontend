/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CompleteWork.css";
import { toast } from "react-hot-toast";
import { Box, TextField, Button } from "@mui/material";

const CompleteWork = ({ assignedTickets, selectedticketid, onClose }) => {
  const baseURL = process.env.REACT_APP_BASE_URL
  const selectedRequest = assignedTickets.find(
    (request) => request.wo_id === selectedticketid
  );
  const [repair, setRepair] = useState({
    wo_technician_remarks: selectedRequest.wo_technician_remarks,
    wo_material_used: selectedRequest.wo_material_used,
    wo_material_cost: selectedRequest.wo_material_cost,
    wo_labor_cost: selectedRequest.wo_labor_cost,
    wo_id: selectedRequest.wo_id,
    wo_r_id: selectedRequest.r_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair((prevRepair) => ({
      ...prevRepair,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const url = `${baseURL}/work_orders/close`;
    const data = {
      wo_technician_remarks: repair.wo_technician_remarks,
      wo_material_used: repair.wo_material_used,
      wo_material_cost: repair.wo_material_cost,
      wo_labor_cost: repair.wo_labor_cost,
      wo_id: repair.wo_id,
      wo_r_id: repair.wo_r_id,
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
        setIsLoading(false); 
        if (!response.ok) {
          throw new Error("Failed to add repair request");
        }
        toast.success("Your Work order has been successfully submitted.");
        onClose(data.wo_id);
        console.log("Your Work order has been successfully submitted");
      })
      .catch((error) => {
        setIsLoading(false); 
        console.error("Error adding repair request:", error);
      });
  };

  const handleClose = (rowIndex) => {
    onClose(rowIndex);
  };

  return (
    <>
      {selectedRequest && (
          <form className="complete-form" onSubmit={handleSubmit}>
            <TextField
              id="description"
              label="Description of work"
              variant="outlined"
              name="wo_technician_remarks"
              value={repair.wo_technician_remarks}
              onChange={handleChange}
              required
            />

            <TextField
              id="materials"
              label="Materials Used"
              variant="outlined"
              name="wo_material_used"
              value={repair.wo_material_used}
              onChange={handleChange}
              required
            />

            <TextField
              id="cost"
              label="Material Cost"
              variant="outlined"
              type="number"
              name="wo_material_cost"
              value={repair.wo_material_cost}
              onChange={handleChange}
              required
            />

            <TextField
              id="labour"
              label="Labour Cost"
              variant="outlined"
              type="number"
              name="wo_labor_cost"
              value={repair.wo_labor_cost}
              onChange={handleChange}
              required
            />

            <Box display="flex" gap="1rem" justifyContent="end">
              
              <Button
                onClick={() => handleClose(selectedticketid)}
                variant="contained"
                color="primary"
                style={{ width: "40%" }}
              >
                Back
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
          </form>
      )}
    </>
  );
};

CompleteWork.propTypes = {
  assignedTickets: PropTypes.func,
  selectedticketid: PropTypes.func,
  onClose: PropTypes.func,
};

export default CompleteWork;
