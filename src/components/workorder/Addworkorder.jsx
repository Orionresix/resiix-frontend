import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  MenuItem,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { toast } from "react-hot-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import nyumba from "../../assets/nyumbaicon.svg";
const baseURL = 'https://orionbackend-1.onrender.com';



const AddrepairForm = ({ onSubmit, onCancel, selectedrequest, repairdata }) => {
  console.log(repairdata)
  const requestdetailsarray = repairdata.filter(item => item.r_id === selectedrequest);
  const requestdetails = requestdetailsarray[0];
  const [repair, setRepair] = useState({
    p_name: '',
    p_id: '',
    u_id: '',
    u_name: '',
    r_description: selectedrequest.r_description,
    r_priority: '',
    r_type: '',
    r_img_url: '',


    wo_pm_description: '',
    wo_assigned_to: '',
    wo_r_id: selectedrequest,
    wo_due_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair((prevRepair) => ({
      ...prevRepair,
      [name]: value,
    }));
  };

  const [selectedTechnician, setSelectedTechnician] = useState('');
  const handleTechnicianChange = (e) => {
    setSelectedTechnician(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${baseURL}/work_orders/create`;
    const data = {
      wo_pm_description: repair.wo_pm_description,
      wo_assigned_to: selectedTechnician,
      wo_r_id: repair.wo_r_id,
      // wo_due_date: repair.wo_due_date,  
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
        onSubmit()
        console.log('repair request added successfully');

      })
      .catch(error => {
        console.error('Error adding repair request:', error);
      });
  };


  const priorities = [
    { id: 1, priority: "HIGH" },
    { id: 1, priority: "MEDIUM" },
    { id: 1, priority: "LOW" }
  ]

  const [categories, setCategory] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch(`${baseURL}/repairs/category`)
      .then(response => response.json())
      .then(data => {
        setCategory(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [technicians, setTechnicians] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch(`${baseURL}/technicians`)
      .then(response => response.json())
      .then(data => {
        setTechnicians(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);






  const handleClose = () => { };
  return (

    <Dialog open={true} onClose={handleClose}>
      <Paper className={'classes.paper'} sx={{ pt: 4, }}>
        <Typography variant="h6" gutterBottom sx={{ ml: 4 }}>
          Create/Assign work order
        </Typography>
        <Grid container spacing={2} sx={{ paddingLeft: 6, }}>


        <Card
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {/* Left Column with fixed-size CardMedia */}
                <CardMedia
                  component="img"
                  image={nyumba}
                  height="40"
                  width="40"
                  sx={{
                    // Add margin to separate from the content on the right
                    flex: "0 0 40px", // Set a fixed width and height for CardMedia
                  }}
                />

                {/* Right Column */}
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
                    {requestdetails.r_description}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {requestdetails.p_name} {requestdetails.u_name}
                  </Typography>
                </CardContent>
              </Card>
          {/* <Typography>{requestdetails.p_name}:{requestdetails.u_name}  </Typography>
          <Typography>{requestdetails.r_description}  </Typography> */}

        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ p: 4 }}>



            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                label="Select technician"
                value={selectedTechnician}
                onChange={handleTechnicianChange}
              >
                {technicians.map((technician) => (
                  <MenuItem key={technician.t_id} value={technician.t_id}>
                    {technician.t_username} -- {technician.t_exepertise}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Remarks"
                name="wo_pm_description"
                value={repair.wo_pm_description}
                onChange={handleChange}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="set Priority"
                name="r_priority"
                value={requestdetails.r_priority}
                onChange={handleChange}
              >
                {priorities.map(priority => (
                  <MenuItem key={priority.id} value={priority.priority}>
                    {priority.priority}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due date"
                  slotProps={{
                    textField: {
                      helperText: 'MM/DD/YYYY',
                    },
                  }}
                />
              </LocalizationProvider>

            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                label="change Maintenance"
                name="r_type"
                value={requestdetails.r_type}
                onChange={handleChange}
              >
                {categories.map(category => (
                  <MenuItem key={category.m_id} value={category.m_name}>
                    {category.m_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>



          <br />

          <Grid item xs={12} sm={6} sx={{ p: 4 }} spacing={4}>
            <span>
              <Button variant="contained" color="secondary" onClick={onCancel} sx={{ mr: 2 }}>
                cancel
              </Button>

              <Button type="submit" variant="contained" color="primary">
                Assign
              </Button>
            </span>
          </Grid>
        </form>
      </Paper>
    </Dialog>
  );
};

AddrepairForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
  uniqueProperties: PropTypes.func.isRequired,
  repairdata: PropTypes.func.isRequired,
  selectedrequest: PropTypes.func.isRequired,
};

export default AddrepairForm;