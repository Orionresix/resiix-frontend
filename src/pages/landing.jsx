import  {React, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/layout/userContext'; // Import the UserContext

const AuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userEmail = params.get('email');

    if (userEmail) {
      setLoggedInUser(userEmail);
      // Navigate to '/dashboard'
      navigate('/dashboard/request');
    }
  }, [location.search, setLoggedInUser]);

  return (<> fgsdddc </>);
};

export default AuthHandler;
