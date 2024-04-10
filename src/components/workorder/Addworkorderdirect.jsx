import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Input,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
const baseURL = 'https://orionbackend-1.onrender.com';



const AddrepairForm = ({ onSubmit, onCancel, properties, uniqueProperties, selectedrequest, repairdata }) => {
  console.log(repairdata)
  const requestdetailsarray = repairdata.filter(item => item.r_id === selectedrequest); 
  const requestdetails = requestdetailsarray[0];
  console.log(requestdetails.p_name)
//   const classes = useStyles();

  const [repair, setRepair] = useState({
    p_name: '',
    p_id: '',
    u_id: '',
    u_name: '',
    r_description: '',
    r_priority: '',
    r_type: '',
    r_img_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair((prevRepair) => ({
      ...prevRepair,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(repair);
    // Optionally, you can reset the form after submission
    setRepair({
        p_name: '',
        p_id: '',
        u_id: '',
        u_name: '',
        r_description: '',
        r_priority: '',
        r_type:'',
        r_img_url:''
    });
  };

  // const [properties, setProperties] = useState([]);
  // const [UniqueProperties, setUniqueProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');


  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value)
    const selectedPropertyId = e.target.value;
    // Filter units based on selected property
    const filteredUnits = properties.filter(item => item.p_id === selectedPropertyId); 
  

   
    
    setRepair(prevState => ({
      ...prevState,
      p_id: selectedPropertyId,
      u_id: filteredUnits.length > 0 ? filteredUnits[0].u_id : '' // Set default unit if available
    }));
    setUnits(filteredUnits)
    console.log(units)
  };

  const priorities = [
    {id: 1, priority: "HIGH"},
    {id: 1, priority: "MEDIUM"},
    {id: 1, priority: "LOW"}
  ]
    
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    fetch( `${baseURL}/repairs/category`) 
      .then(response => response.json())
      .then(data => {   
        setCategory(data);     
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 


  const handleChangeUnit = (event) => {
    const selectedUnitId = event.target.value;
    setSelectedUnit(selectedUnitId);
  };
  const handleClose = () => { };
  return (

    <Dialog open={true} onClose={handleClose}>
    <Paper className={'classes.paper'}  sx={{ pt: 4, }}>
    <Typography variant="h6" gutterBottom sx={{ ml: 4 }}>
     Create/Assign work order
    </Typography>
    <Typography>{requestdetails.p_name}:{requestdetails.u_name}  </Typography>
    <Typography>{requestdetails.r_description}  </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ p: 4 }}>

        <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          fullWidth
          label="Select Property"
          value={selectedProperty}
          onChange={handlePropertyChange}
        >
          {uniqueProperties.map((property) => (
            <MenuItem key={property.p_id} value={property.p_id}>
              {property.p_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          fullWidth
          label="Select Unit"
          name="u_id"
          value={selectedUnit}
          onChange={handleChangeUnit}
        >
          {units.map(unit => (
            <MenuItem key={unit.u_id} value={unit.u_id}>
              {unit.u_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>


<Grid item xs={12} sm={6}>
        <TextField
          select
          required
          fullWidth
          label="Select technician"
          value={selectedProperty}
          onChange={handlePropertyChange}
        >
          {uniqueProperties.map((property) => (
            <MenuItem key={property.p_id} value={property.p_id}>
              {property.p_name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Description"
              name="r_description"
              value={requestdetails.r_description}
              onChange={handleChange}
            />
          </Grid>


          <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          fullWidth
          label="Select Priority"
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
            <TextField
              select
              required
              fullWidth
              label="Select Maintenance"
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
        <br/> 

        <Grid item xs={12} sm={6} sx={{ p: 4 }} spacing={4}>
        <span>
          <Button variant="contained" color="secondary" onClick={onCancel} sx={{ mr: 2 }}>
            cancel
          </Button>

          <Button type="submit" variant="contained" color="primary">
            Create request
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
  uniqueProperties :PropTypes.func.isRequired,
  repairdata : PropTypes.func.isRequired,
  selectedrequest :  PropTypes.func.isRequired,
};

export default AddrepairForm;