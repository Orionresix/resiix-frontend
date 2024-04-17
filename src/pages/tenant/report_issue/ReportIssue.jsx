import React, {useState ,useEffect} from 'react';
import './ReportIssue.css';
import { toast, Toaster } from "react-hot-toast";
import { useLocation } from 'react-router-dom';
import {
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';

const ReportIssue = () => {
  const baseURL = process.env.REACT_APP_BASE_URL
    // const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const unitDetails = state ? state.unitDetails : null;

    const [unitNumber, setUnitNumber] = useState(unitDetails.u_name);
    const [contactNumber, setContactNumber] = useState(unitDetails.l_phone);
    const [description, setDescription] = useState('');
    const [mantainanceType, setMantainanceType] = useState('Electrical');
    const [image, setImage] = useState('');


    // const [repair, setRepair] = useState({
    //   p_name: '',
    //   p_id: '',
    //   u_id: '',
    //   u_name: '',
    //   r_description: '',
    //   r_priority: '',
    //   r_type: '',
    //   r_img_url: ''
    // });


  const handlereportIssue = (e) => {
    e.preventDefault(); 
    const url = `${baseURL}/repairs/create`;
    const data = {
      p_name: unitDetails.p_name,
      p_id: unitDetails.p_id,
      u_id: unitDetails.u_id,
      u_name: unitDetails.u_name,
      r_description: description,
      r_phone: contactNumber,
      priority: 'HIGH',
      r_type: mantainanceType,
      r_img_url: image,
      r_l_id:unitDetails.l_id
    };
    const options = {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type of the request body
      },
      body: JSON.stringify(data), // Convert data to JSON string for the request body
    };
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add repair request');
        }
        toast.success("Your Request has been successfully submitted.");
        console.log('repair request added successfully'); 
      })
      .catch(error => {
        console.error('Error adding repair request:', error);
      });
  };


  const [categories, setCategory] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch( `${baseURL}/repairs/category`) // Replace with your actual backend API URL
      .then(response => response.json())
      .then(data => {   
        setCategory(data);     
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 



  return (
    <div className='report-issue'>
        <div className="report-welcome">
            <h1>Report an issue</h1>
            <p>Describe below the issues you are facing.</p>
        </div>
        <form className="report-form" onSubmit={handlereportIssue} >
            <div className="form-group">
                <label htmlFor="r_p_id">Apartment: {unitDetails.p_name} </label>
            </div>
            <div className="form-group">
                <label htmlFor="unit-number">Unit Name</label>
                <input type="text" id="u_name" name="u_name" value={unitNumber} onChange={(e) => setUnitNumber(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="tenant-name">Tenant Name</label>
                <input type="text" id="tenant_name" name="tenant_name" value={unitDetails.tenant_name} required/>
            </div>
            <div className="form-group">
                <label htmlFor="contact-number">Contact Number</label>
                <input type="text" id="r_phone" name="r_phone" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="r_description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>

            <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              label="Select Maintenance"
              name="r_type"
              value={mantainanceType}
              onChange={(e) => setMantainanceType(e.target.value)}
            >
              {categories.map(category => (
            <MenuItem key={category.m_id} value={category.m_name}>
              {category.m_name}
            </MenuItem>
          ))}
            </TextField>
          </Grid>


            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} required/>
            </div>
            <div className="form-group">
                <button type="submit" >Send Request</button>
            </div>
            <Toaster
          toastOptions={{
            style: {
              background: "green",
              color: "#fff",
            },
          }}
        />
        </form>
    </div>
  )
}

export default ReportIssue