import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "./Onboarding.css";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import BusinessIcon from "@mui/icons-material/Business";

const baseURL = "https://orionbackend-1.onrender.com";

const Signup = () => {
  const googlelogin = `${baseURL}/login`;

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
            <div className="card-wrapper">
              <Card className="card">
                <CardContent className="card-content">
                  <PersonIcon fontSize="large" />
                  <h4>Tenant</h4>
                </CardContent>
              </Card>
              <div className="button-wrapper">
                <Button
                  className="signup_button"
                  variant="contained"
                  component={Link}
                  to="/resiix"
                >
                  Proceed 
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className="card-wrapper">
              <Card className="card">
                <CardContent className="card-content">
                  <BuildIcon fontSize="large" />
                  <h4>Technician</h4>
                </CardContent>
              </Card>
              <div className="button-wrapper">
                <Button
                  className="signup_button"
                  variant="contained"
                  component={Link}
                  to="/resiix"
                >
                  Proceed 
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={4}>
            <div className="card-wrapper">
              <Card className="card">
                <CardContent className="card-content">
                  <BusinessIcon fontSize="large" />
                  <h4>Property Manager</h4>
                </CardContent>
              </Card>
              <div className="button-wrapper">
                <Link className="green" to={googlelogin}>
                  <Button
                    className="signup_button"
                    variant="contained"
                    component={Link}
                    to={googlelogin}
                  >
                    Login with Google
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Signup;
