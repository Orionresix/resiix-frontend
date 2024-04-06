/* eslint-disable react/prop-types */
import React from 'react'
import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import { PlaceOutlined } from '@mui/icons-material'

const colors = {
  electrical: 'red',
  plumbing: 'blue',
  ac: 'green',
  general: 'purple',
  overdue: 'orange',
}
const subText = {
  electrical: 'Electrical Requests',
  plumbing: 'Plumbing',
  general: 'General repairs',
  ac: 'Air conditioning',
  overdue: 'Overdue work orders',
}

const TicketComponent = ({ ticket }) => {
  // const styles = {
  //   border: isSelected ? '1px solid green' : null,
  //   padding: '10px',
  //   marginBottom: '5px',
  //   cursor: 'pointer',
  //   backgroundColor: '#FAF9F6',
  //   boxShadow: isSelected ? 'default' : 'none',
  // }
  return (
    <Card>
      <CardContent>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='caption' gutterBottom>
            Tck-{`${ticket.ticketNumber}`.padStart(5, '0')}
          </Typography>
          <Chip
            label={subText[ticket.type]}
            sx={{
              backgroundColor: colors[ticket.type],
              color: '#fff',
              fontSize: 10,
            }}
            size='small'
          />
        </Box>
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', margin: '10px 0 20px 0' }}>
          {ticket.description}
        </Typography>
        <Box display='flex' alignItems='center'>
          <PlaceOutlined />
          <Typography variant='caption'>{`Building #${ticket.unitNumber}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TicketComponent