/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";

const colors = {
  NEW: "#FFC107",
  DONE: "Green",
  ASSIGNED:"Orange",
  INSPECTION: "Orange",
  WIP: "Blue",
  CANCELLED: "red",
};
const typecolors = {
  Electric: "green",
  Plumbing: "blue",
  general: "green",
  Carpentry: "green",
  Painting:"orange",
  Masonary:"orange"
};

const TicketComponent = ({
  r_type,
  r_description,
  r_id,
  r_status,
  p_name,
  u_name,
  handleClick,
  isSelected,
}) => {
  const styles = {
    border: isSelected ? "1px solid green" : null,
    padding: "10px",
    marginBottom: "5px",
    cursor: "pointer",
    backgroundColor: "#FAF9F6",
    boxShadow: isSelected ? "default" : "none",
  };
  return (
    <Card className={styles} onClick={handleClick}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" gutterBottom>
            {/* Tck-{`${r_id}`.padStart(5, '0')} */}
            TKT-{r_id}
          </Typography>
        
          <Chip
            label={r_type}
            sx={{
              backgroundColor: typecolors[r_type],
              color: "#fff",
              fontSize: 10,
            }}
            size="small"
          />


        </Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", margin: "10px 0 20px 0" }}
        >
          {r_description}
        </Typography>
        <Box display="flex" alignItems="center">
          <PlaceOutlined />
          <Typography variant="caption">
          {p_name} -- {u_name}
          </Typography>
        </Box>

        <Chip
            label={r_status}
            sx={{
              backgroundColor: colors[r_status],
              color: "#fff",
              fontSize: 10,
            }}
            size="small"
          />
      </CardContent>
    </Card>
  );
};

export default TicketComponent;
