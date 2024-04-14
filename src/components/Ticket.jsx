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
  Electric: "red",
  Plumbing: "blue",
  general: "purple",
  Carpentry: "indigo",
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
    // padding: "4px",
    marginBottom: "5px",
    cursor: "pointer",
    backgroundColor: "#FAF9F6",
    boxShadow: isSelected ? "default" : "none",
  };
  return (
    <Card className={styles} onClick={handleClick}  sx={{
      border: isSelected ? "1px solid green" : "1px solid #E0E0E0", // Material-UI border
      borderRadius: '4px', // Optional: Add border radius
      cursor: "pointer",
      boxShadow: isSelected ? "default" : "none",
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" >
          <Typography variant="caption" gutterBottom>
            {/* Tck-{`${r_id}`.padStart(5, '0')} */}
            TKT-{r_id}
          </Typography>
          <Box>
          <Chip
            label={r_status}
            sx={{
              backgroundColor: colors[r_status],
              color: "#fff",
              fontSize: 10,
              marginRight: 1,
            }}
            size="small"
          />
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
          {/* <Chip
            label={r_type}
            sx={{
              backgroundColor: typecolors[r_type],
              color: "#fff",
              fontSize: 10,
            }}
            size="small"
          /> */}


        </Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            margin: "8px 0 12px 0",
            lineHeight: "1.2", // Set line height
            maxHeight: "1.2em", // Set max height to truncate
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1, // Limit to one line
            WebkitBoxOrient: "vertical",
            height: '180px',
          }}
        >
          {r_description}
        </Typography>
        <Box display="flex" alignItems="center">
          <PlaceOutlined />
          <Typography variant="caption">
          {p_name} -- {u_name}
          </Typography>

          {/* <Chip
            label={r_status}
            sx={{
              backgroundColor: colors[r_status],
              color: "#fff",
              fontSize: 10,
            }}
            size="small"
          /> */}
        </Box>

        {/* <Chip
            label={r_status}
            sx={{
              backgroundColor: colors[r_status],
              color: "#fff",
              fontSize: 10,
            }}
            size="small"
          /> */}
      </CardContent>
    </Card>
  );
};

export default TicketComponent;
