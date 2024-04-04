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



const AddrepairForm = ({ onSubmit, onCancel }) => {
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

  const [properties, setProperties] = useState([]);
  const [UniqueProperties, setUniqueProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://127.0.0.1:5000/properties/units') // Replace with your actual backend API URL
      .then(response => response.json())
      .then(data => {
        // Extract properties and units from the fetched data
        const properties = data.map(item => ({
          p_id: item.p_id,
          p_name: item.p_name,
          u_id: item.u_id,
          u_name:  item.u_name
        }));
        setProperties(properties);

        const uniqueProperties = properties.reduce((unique, current) => {
            // Check if the current property ID is already in the unique array
            if (!unique.some(property => property.p_id === current.p_id)) {
              unique.push(current);
            }
            return unique;
          }, []);
          setUniqueProperties(uniqueProperties);
          
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
    fetch('http://127.0.0.1:5000/repairs/category') // Replace with your actual backend API URL
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
      Add Repair/Maintenance Request
    </Typography>
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
          {UniqueProperties.map((property) => (
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
              required
              fullWidth
              label="Description"
              name="r_description"
              value={repair.r_description}
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
          value={repair.r_priority}
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
              value={repair.r_type}
              onChange={handleChange}
            >
              {categories.map(category => (
            <MenuItem key={category.m_id} value={category.m_name}>
              {category.m_name}
            </MenuItem>
          ))}
            </TextField>
          </Grid>

    

          <Grid item xs={12} sm={6}>
           <Input 
           type="file"
          accept="image/*"
          fullWidth 
          label="Attach Photo"
          name="r_img_url"
          onChange={handleChange} // Change handler for image selection
          />
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
};

export default AddrepairForm;