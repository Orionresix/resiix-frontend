/* eslint-disable react/prop-types */
import { React, useState } from "react";
import {
  TableCell,
  TableRow,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Popover,
  IconButton,
  Chip
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
                <CardContent style={{ padding: "4px" }}>
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
                </CardContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
    </div>
  );
};

export default RepairsTable;
