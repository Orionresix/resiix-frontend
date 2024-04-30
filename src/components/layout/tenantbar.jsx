import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RepairIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BottomNavbar = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#00B286", // Change the background color to the green you used earlier
  borderTop: `1px solid ${theme.palette.primary.light}`,
}));

export default function BottomNavbarSidebar({ children }) {
  const [value, setValue] = React.useState("workorders");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <BottomNavbar value={value} onChange={handleChange}>
        <Link to="/resiix/reported">
          <BottomNavigationAction
            label="Work Orders"
            value="workorders"
            icon={<RepairIcon />}
            styleOverrides={{
              root: {
                color: value === 'workorders' ? 'white' : 'inherit', // Set the color to white when selected
              },
              selected: {
                color: 'white', // Set the color to white when selected
              },
            }}
          />
        </Link>
        <Link to="/resiix/reportedhistory">
          <BottomNavigationAction
            label="History"
            value="history"
            icon={<HistoryIcon />}
            styleOverrides={{
              root: {
                color: value === 'workorders' ? 'white' : 'inherit', // Set the color to white when selected
              },
              selected: {
                color: 'white', // Set the color to white when selected
              },
            }}
          />
        </Link>
      </BottomNavbar>
      
    </Box>
  );
}

BottomNavbarSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
