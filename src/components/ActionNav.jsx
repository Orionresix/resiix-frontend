/* eslint-disable react/prop-types */
import {Search } from '@mui/icons-material';
import { Typography, Box, IconButton, MenuItem,  TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { React, useState } from 'react'

export const ActionNav = ({ icons, onAddClick, icontitle, uniqueProperties, uniqueType, uniquepriorities, uniquestatuses }) => {
  const filterOptions = [
    { value: 'Property', label: 'Property' },
    { value: 'Type', label: 'Type' },
    { value: 'Priority', label: 'Priority' },
    { value: 'Status', label: 'Status' },
  ];


  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const [filtervalue, setFiltervalue] = useState('');
  const handleFiltervalue = (event) => {
    setFiltervalue(event.target.value);
    console.log(event.target.value);
  };
  

  return (
    <Box className='actionNav'>
      <Box display='flex'>
        
       
        
        {/* Search Box */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <TextField label="Search" variant="outlined" size="small" />
          <Search />
        </Box>

        {/* Filter By */}
        <Box display='flex'>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
          <TextField
          select
          fullWidth
          label="Filter By"
          value={selectedFilter}
          onChange={handleFilterChange}
          sx={{ width: '180px' }} 
        >
        
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
             </TextField>
         
        </Box>



        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
        <TextField
          select
          fullWidth
          label={`Select ${selectedFilter}`}
          value={filtervalue}
          onChange={handleFiltervalue}
          sx={{ width: '180px' }} 
        >
{selectedFilter === 'Property' && (
      uniqueProperties.map((property) => (
        <MenuItem key={property.p_id} value={property.p_id}>
          {property.p_name}
        </MenuItem>
      ))
    )}
    {selectedFilter === 'Type' && (
      uniqueType.map((item) => (
        <MenuItem key={item.r_type} value={item.r_type}>
          {item.r_type}
        </MenuItem>
      ))
    )}
    {selectedFilter === 'Status' && (
      uniquestatuses.map((item) => (
        <MenuItem key={item.r_status} value={item.r_status}>
          {item.r_status}
        </MenuItem>
      ))
    )}
    {selectedFilter === 'Priority' && (
      uniquepriorities.map((item) => (
        <MenuItem key={item.r_priority} value={item.r_priority}>
          {item.r_priority}
        </MenuItem>
      ))
    )}

        </TextField>
        </Box>
        </Box>



      {/* Icons */}
      {icons.map((icon, index) => (
          <IconButton key={index}>{icon}</IconButton>
        ))}
        
        {/* Add button  */}
       <IconButton onClick={onAddClick}>
          <Box sx={{ width: 30, height: 30, backgroundColor: '#00B286', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AddIcon sx={{ fontSize: 20, color: 'white' }} />
          </Box>
          <Typography sx={{ color: '#00B286', fontWeight: 'bold' }}>{icontitle}</Typography>
        </IconButton>

      </Box>
    </Box>
  );
};

export default ActionNav;
