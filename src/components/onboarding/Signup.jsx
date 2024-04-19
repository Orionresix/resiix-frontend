/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CardContent from "@mui/material/CardContent";
import "./Onboarding.css";
import logo from "../../assets/logo.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const baseURL = "https://orionbackend-1.onrender.com";

const Signup = () => {
  const googlelogin = `${baseURL}/login`;

  return (
    <Stack sx={{ maxWidth: 878 }} variant="outlined" className="card">
      <CardContent className="Welcome">
        <img src={logo} alt="logo" />
      </CardContent>

      <CardContent className="Welcome">
        <h3>Welcome to Resiix</h3>
      </CardContent>

      <CardContent>
        <a href="/resiix">
          <Button className="signup_button" variant="contained">
            proceed as a Tenant
          </Button>
        </a>
      </CardContent>

      <CardContent>
        <a href="/resiix">
          <Button className="signup_button" variant="contained">
            proceed as a Technician
          </Button>
        </a>
      </CardContent>

      <CardContent>
        <Link className="green" to={googlelogin}>
          <Button className="signup_button" variant="contained">
            Login with Google
          </Button>
        </Link>
      </CardContent>
    </Stack>
  );
};

export default Signup;
