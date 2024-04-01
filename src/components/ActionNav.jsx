/* eslint-disable react/prop-types */
import { AddCircle } from '@mui/icons-material'
import { Typography, Box, IconButton } from '@mui/material'
import React from 'react'

export const ActionNav = ({ title, icons, onAddClick}) => {
  return (
    <Box className='actionNav'>
      <Typography sx={{ color: '#00B286', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box display='flex'>
        {icons.map((icon, index) => (
          <IconButton key={index}>{icon}</IconButton>
        ))}
        <IconButton onClick={onAddClick} >
          <AddCircle sx={{ color: '#00B286', fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ActionNav
