/* eslint-disable react/prop-types */
import { React, useState } from "react";
import {
  TableCell,
  TableRow,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import nyumba from "../assets/nyumbaicon.svg";
import actionicon from "../assets/actionicon.svg"

const getStatusColor = (r_status) => {
  switch (r_status) {
    case "NEW":
      return "orange";
    case "ASSIGNED":
      return "blue";
    case "WIP":
      return "yellow";
    case "DONE":
      return "green";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

const repairsTable = ({  repairdata, onAddClick, onViewDetailsClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(Array(repairdata.length).fill(false));
  const handleCellClick = (rowIndex) => {
    setIsDropdownOpen((prevState) => {
      const newDropdowns = [...prevState];
      newDropdowns[rowIndex] = !newDropdowns[rowIndex];
      return newDropdowns;
    });
  };

  const handleMenuItemClick = (action, rowIndex) => {
    setIsDropdownOpen(false); // Close dropdown after selection
    switch (action) {
      case "add":
        onAddClick(rowIndex);
        break;
      case "viewDetails":
        onViewDetailsClick(rowIndex);
        break;
      case "reject":
        // onDeleteClick(rowIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        height: 400,
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "auto",
      }}
    >
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Tenant Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>

      {repairdata.map((order) => (
          <TableRow key={order.r_id}>
            <TableCell>{order.r_id}</TableCell>

            <TableCell>
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {/* Left Column with fixed-size CardMedia */}
                <CardMedia
                  component="img"
                  image={nyumba}
                  alt={order.p_name}
                  height="40"
                  width="40"
                  sx={{
                    // Add margin to separate from the content on the right
                    flex: "0 0 40px", // Set a fixed width and height for CardMedia
                  }}
                />

                {/* Right Column */}
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "200px",
                      fontWeight: "bold",
                    }}
                  >
                    {order.r_description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {order.p_name} {order.u_name}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {order.r_phone}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {order.r_type}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {order.r_type}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {order.r_type}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Box
                sx={{
                  backgroundColor: getStatusColor(order.r_status),
                  fontSize: "0.5rem",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "auto",
                  width: "fit-content",
                  padding: "4px 8px",
                  lineHeight: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {order.r_status}
                </Typography>
              </Box>
            </TableCell>

            <TableCell onClick={() => handleCellClick(order.r_id)}>
              {!isDropdownOpen[[order.r_id]] && (
                 <CardMedia
                 component="img"
                 image={actionicon}
                 alt={order.p_name}
                 height="40"
                 width="40"
                 sx={{flex: "0 0 40px",  }}
               />


              )}

              {isDropdownOpen[order.r_id] && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    onClick={() => handleMenuItemClick("add", order.r_id)}
                  >
                    create workorder
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    onClick={() =>
                      handleMenuItemClick("viewDetails", order.r_id)
                    }
                  >
                    view details
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    onClick={() => handleMenuItemClick("reject", order.r_id)}
                  >
                    reject
                  </Typography>
                </>
              )}
            </TableCell>
          </TableRow>
        ))
    }
    </div>
  );
};

export default repairsTable;
