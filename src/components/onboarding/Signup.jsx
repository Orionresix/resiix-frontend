import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import "./Onboarding.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import BusinessIcon from "@mui/icons-material/Business";

const baseURL = "https://orionbackend-1.onrender.com";

const Signup = () => {
  const googlelogin = `${baseURL}/login`;

  // State variables to track the selected state of each card
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card selection
  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
<Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      className="signup-container"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <img src={logo} alt="logo" />
      </Grid>

      <Grid item>
        <CardContent className="Welcome">
          <h3>Welcome to Resiix</h3>
        </CardContent>
      </Grid>

      <Grid item container justifyContent="center">
        <div className="cards-container">
          <Grid item xs={12} sm={4}>
            <Link
              to="/resiix"
              className={card ${selectedCard === "tenant" ? "selected" : ""}}
              onClick={() => handleCardClick("tenant")}
            >
              <CardContent className="card-content">
                <PersonIcon
                  fontSize="large"
                  style={{
                    color: "#757575", // Grey
                    transition: "color 0.3s, transform 0.3s", // Smooth transition
                    transformOrigin: "center",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#1b5e20")} // Green 500 on hover
                  onMouseLeave={(e) => (e.target.style.color = "#757575")} // Grey on hover out
                />
                <h4>Tenant</h4>
              </CardContent>
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Link
              to="/resiix"
              className={card ${selectedCard === "technician" ? "selected" : ""}}
              onClick={() => handleCardClick("technician")}
            >
              <CardContent className="card-content">
                <BuildIcon
                  fontSize="large"
                  style={{
                    color: "#757575", // Grey
                    transition: "color 0.3s, transform 0.3s", // Smooth transition
                    transformOrigin: "center",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#1b5e20")} // Green 500 on hover
                  onMouseLeave={(e) => (e.target.style.color = "#757575")} // Grey on hover out
                />
                <h4>Technician</h4>
              </CardContent>
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Link
              to={googlelogin}
              className={card ${selectedCard === "propertyManager" ? "selected" : ""}}
              onClick={() => handleCardClick("propertyManager")}
            >
              <CardContent className="card-content">
                <BusinessIcon
                  fontSize="large"
                  style={{
                    color: "#757575", // Grey
                    transition: "color 0.3s, transform 0.3s", // Smooth transition
                    transformOrigin: "center",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#1b5e20")} // Green 500 on hover
                  onMouseLeave={(e) => (e.target.style.color = "#757575")} // Grey on hover out
                />
                <h4>Property Manager</h4>
              </CardContent>
            </Link>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;