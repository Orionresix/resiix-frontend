/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import { Typography, Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { React } from "react";

export const ActionNav = ({ icons, onAddClick, icontitle }) => {
  return (
    <Box className="actionNav" id="top">
      <Box
        display="flex"
        justifyContent="space-between"
        id="subparent"
        width="100%"
      >
        {/* Search Box */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: "0px" }}
          id="inner1"
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00B286",
              padding: "8px",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <Search sx={{ color: "white" }} />
          </Box>
        </Box>

        <Box display="flex" id="inner3">
          {/* Icons */}
          {icons.map((icon, index) => (
            <IconButton key={index}>{icon}</IconButton>
          ))}

          {/* Add button  */}
          <IconButton
            onClick={onAddClick}
            sx={{
              border: "1px solid #00B286",
              borderRadius: " 4px",
              padding: "4.5px",
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 32,
                backgroundColor: "#00B286",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AddIcon sx={{ fontSize: 20, color: "white" }} />
            </Box>
            <Typography
              sx={{ color: "#00B286", fontWeight: "bold", marginLeft: "8px" }}
            >
              {icontitle}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ActionNav;
