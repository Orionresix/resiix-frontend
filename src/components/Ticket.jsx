/* eslint-disable react/prop-types */
import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'

const colors = {
  NEW: 'green',
  DONE: 'blue',
  WIP: 'orange',
  CANCELLED: 'red',
}

const TicketComponent = ({
   r_type, r_description,r_id,wo_pm_description,r_status, wo_status,
  // wo_id , wo_l_id, wo_u_id, wo_created_time,
  // wo_assigned_to, wo_assigned_by,  wo_due_date, wo_r_id,
  // r_id, r_img_url, r_img_url1, r_img_url2,
  // r_l_id, r_u_id, r_created_time, r_phone,
  title,
  handleClick,
  isSelected,
}) => {
  const styles = {
    border: isSelected ? '1px solid green' : null,
    padding: '10px',
    marginBottom: '5px',
    cursor: 'pointer',
    backgroundColor: '#FAF9F6',
    minHeight: "100px",
    boxShadow: isSelected ? 'default' : 'none',
  }
  return (
    <Card sx={styles} onClick={handleClick}  >
      <CardContent>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' gutterBottom>
            Ticket #{r_id}
          </Typography>
          <Chip
            label={r_status === 'progress' ? 'IN PROGRESS' : r_status}
            sx={{
              backgroundColor: colors[r_status],
              color: '#fff',
              fontSize: 10,
            }}
            size='small'
          />
        </Box>
        <Typography variant='body2' gutterBottom>
          {r_description} 
        </Typography>

        <Typography variant='body2' gutterBottom>
          {wo_pm_description} 
        </Typography>
        <Typography variant='body2' gutterBottom>
          {wo_status} 
        </Typography>
      
        
        
        

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Chip label={title} size='small' />
          <Typography variant='body2'>{r_type} </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TicketComponent
