import React, { } from "react";
import PropTypes from "prop-types";
import "./CompleteWork.css";
import { Box, Card, Button, Typography } from "@mui/material";

const CompleteWork = ({ assignedTickets, selectedticketid, onClose }) => {

  const selectedRequest = assignedTickets.find(
    (request) => request.wo_id === selectedticketid
  );




  const handleClose = (rowIndex) => {
    onClose(rowIndex);
  };

  return (
    <>
      {selectedRequest && (
        <Card sx={{ marginBottom: "10px", maxWidth: "400px", margin: "auto" }}>



          <Typography variant="caption" gutterBottom>
            {selectedRequest.wo_technician_remarks}
            </Typography>


            <Typography variant="caption" gutterBottom>
            {selectedRequest.wo_material_used}
            </Typography>
           

            <Typography variant="caption" gutterBottom>
            {selectedRequest.wo_material_cost}
            </Typography>
           

            <Typography variant="caption" gutterBottom>
            {selectedRequest.wo_labor_cost}
            </Typography>
           
           

            <Box>
             

              <Button
                onClick={() => handleClose(selectedticketid)}
                variant="contained"
                color="primary"
                style={{ width: "40%" }}
              >
                Back
              </Button>

            </Box>

 
        </Card>
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
