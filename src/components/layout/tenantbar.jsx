import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import repair from "../../assets/request_icon.svg";
import ListItemWithLink from "../ListItemWithLink";
import PropTypes from "prop-types";

const BottomNavbar = styled("div")(() => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#00B286",
}));

const HorizontalList = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
});

export default function BottomNavbarSidebar({ children }) {
  return (

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
        <BottomNavbar>
          <Drawer
            open={true}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              width: "100%",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#00b286", // Transparent background for bottom navbar
              },
            }}
            variant="persistent"
            anchor="bottom"
          >
            <HorizontalList>
              <ListItemWithLink
                label="Add Requests"
                icon={<img src={repair} alt="Custom Icon" />}
                to="/resiix/report-issue"
                sx={{ width: "70px" }}
              />

<ListItemWithLink
                label="Active Requests"
                icon={<img src={repair} alt="Custom Icon" />}
                to="/resiix/reported"
                sx={{ width: "70px" }}
              />
              <ListItemWithLink
                label="History"
                icon={<DashboardIcon />}
                to="/resiix/reportedhistory"
                sx={{ width: "70px" }}
              />
            </HorizontalList>
          </Drawer>
        </BottomNavbar>
      </Box>

  );
}

BottomNavbarSidebar.propTypes = {
  children: PropTypes.node.isRequired, // Add PropTypes validation
};
