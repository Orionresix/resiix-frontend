/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Popover,
  IconButton,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import nyumba from "../assets/nyumbaicon.svg";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const colors = {
  NEW: "#FFC107",
  DONE: "Green",
  ASSIGNED:"Orange",
  INSPECTION: "Orange",
  WIP: "Blue",
  CANCELLED: "red",
};


const RepairsTable = ({ repairdata, onAddClick, onViewDetailsClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleMenuItemClick = (action, rowIndex) => {
    handleClose(); // Close the popover
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

  console.log(repairdata)

  return (
    <div
      style={{
        height: `calc(100vh - 200px)`, // Adjust the height dynamically
        width: "100%", // Take the entire available screen width
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "auto",
      }}
    >
      <TableRow>
        <TableCell width="1%">Code</TableCell>
        <TableCell width="1%">Description</TableCell>
        <TableCell width="1%">Phone</TableCell>
        <TableCell width="1%">Type</TableCell>
        <TableCell width="1%">Date</TableCell>
        <TableCell width="1%">Address</TableCell>
        <TableCell width="1%">Status</TableCell>
        <TableCell width="1%">Action</TableCell>
      </TableRow>

      {repairdata.map((order) => (
          <TableRow key={order.r_id}>
            <TableCell width="1%">#RQ{order.r_id}</TableCell>

            <TableCell width="1%">
              <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={nyumba}
                  alt={order.p_name}
                  height="40"
                  width="40"
                  sx={{
                    flex: "0 0 40px",
                  }}
                />

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
                    {order.r_created_time}
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
                    {order.p_address}
                  </Typography>
                </CardContent>
              </Card>
            </TableCell>

            <TableCell>
              <Chip
                label={order.r_status}
                sx={{
                  backgroundColor: colors[order.r_status],
                  color: "#fff",
                  fontSize: 10,
                }}
                size="small"
              />
            </TableCell>

            <TableCell>
              <IconButton onClick={(event) => handleClick(event, order.r_id)}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                id={id}
                open={open && selectedId === order.r_id}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <CardContent style={{ padding: "4px", width: 200 }}>
                  <div style={{ marginBottom: "4px", width: "100%" }}>
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      sx={{ fontSize: "body6.fontSize", width: "100%" }}
                      onClick={() => handleMenuItemClick("add", order.r_id)}
                    >
                      Create Workorder
                    </Button>
                  </div>
                  <Divider />
                  <div style={{ marginBottom: "4px", width: "100%" }}>
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      sx={{ fontSize: "body6.fontSize", width: "100%" }}
                      onClick={() => handleMenuItemClick("viewDetails", order.r_id)}
                    >
                      View Details
                    </Button>
                  </div>
                  <Divider />
                  <div style={{ width: "100%" }}>
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      sx={{ fontSize: "body6.fontSize", width: "100%" }}
                      onClick={() => handleMenuItemClick("reject", order.r_id)}
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
    </div>
  );
};

export default RepairsTable;
