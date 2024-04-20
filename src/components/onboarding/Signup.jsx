/* eslint-disable react/no-unescaped-entities */
import {React, useState} from "react";
import CardContent from "@mui/material/CardContent";
import "./Onboarding.css";
import logo from "../../assets/logo.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  // eslint-disable-next-line no-undef
  const baseURL = process.env.REACT_APP_BASE_URL

  const googlelogin = baseURL;

  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        redirect: 'follow', // Ensure that fetch follows redirects
      });
      const data = await response.json();
      console.log(data)
      setToken(data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
 

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
          <Button className="signup_button" variant="contained" onClick={handleLogin}>
            proceed as a Google
          </Button>
   

        {token && <p>JWT Token: {token}</p>}
      </CardContent>



      <CardContent>
        <Link className="green" to={googlelogin}>
          <Button className="signup_button" variant="contained" >
            Login with Google
          </Button>
        </Link>
      </CardContent>
    </Stack>
  );
};

export default Signup;
