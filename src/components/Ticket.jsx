/* eslint-disable react/prop-types */
import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'

const colors = {
  NEW: 'green',
  DONE: '#3CA38F',
  WIP: 'orange',
  CANCELLED: 'red',
}

const TicketComponent = ({
  wo_id,wo_status, r_type, r_description,
  //  wo_pm_description, wo_l_id, wo_u_id, wo_created_time,
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
    boxShadow: isSelected ? 'default' : 'none',
  }
  return (
    <Card sx={styles} onClick={handleClick}>
      <CardContent>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h6' gutterBottom>
            Ticket #{wo_id}
          </Typography>
          <Chip
            label={wo_status === 'progress' ? 'IN PROGRESS' : wo_status.toUpperCase()}
            sx={{
              backgroundColor: colors[wo_status],
              color: '#fff',
              fontSize: 10,
            }}
            size='small'
          />
        </Box>
        <Typography variant='body2' gutterBottom>
          {r_description} 
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
