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
    <Box className='actionNav' id="top" >
      <Box display='flex' justifyContent='space-between'  id="subparent" width="100%">
        
       
        
        {/* Search Box */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '0px', }} id="inner1">
        <TextField 
          label="Search" 
          variant="outlined" 
          size="small" 
          sx={{ 
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopRightRadius: 0, 
              borderBottomRightRadius: 0 
            } 
          }} 
        />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00B286', padding: '8px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
            <Search sx={{ color: 'white' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          <TextField
          select
          fullWidth
          label="Filter By"
          size="small"
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



        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
        <TextField
          select
          fullWidth
          label={`Select ${selectedFilter}`}
          value={filtervalue}
          size="small"
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

        {/* Filter By */}
        {/* <Box display='flex' id="inner2">

        </Box> */}


    <box display='flex' id="inner3">
      {/* Icons */}
      {icons.map((icon, index) => (
          <IconButton key={index}>{icon}</IconButton>
        ))}
        
        {/* Add button  */}
        <IconButton onClick={onAddClick} sx={{ border: '1px solid #00B286', borderRadius: ' 4px', padding: '4.5px'}}>
        <Box sx={{ width: 30, height: 32, backgroundColor: '#00B286', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AddIcon sx={{ fontSize: 20, color: 'white' }} />
        </Box>
        <Typography sx={{ color: '#00B286', fontWeight: 'bold', marginLeft: '8px'}}>{icontitle}</Typography>
      </IconButton>
    </box>
      </Box>
    </Box>
  );
};

export default ActionNav;
