/* eslint-disable react/prop-types */
import React from 'react'
import {TableCell,TableRow,  Card,
  CardMedia,
  CardContent, Typography
   } from '@mui/material'
import nyumba from '../assets/nyumbaicon.svg'

const getStatusColor = (r_status) => {
  switch (r_status) {
    case 'NEW':
      return 'orange'
    case 'ASSIGNED':
      return 'blue'
    case 'WIP':
      return 'yellow'
    case 'DONE':
          return 'green'
    case 'CANCELLED':
      return 'red'
    default:
      return 'gray'
  }
}

const repairsTable = ({  groupeddata }) => {

  return (
    <div style={{ height: 400, width: '100%' }}>

<TableRow>
  <TableCell>ID</TableCell>
  <TableCell>Description</TableCell>
  <TableCell>Phone</TableCell>
  <TableCell>Type</TableCell>
  <TableCell>Status</TableCell>
</TableRow>


{groupeddata.map(group => (
  group.orders.map(order => (
    <TableRow key={order.r_id}>
      <TableCell>{order.r_id}</TableCell>



      

      <TableCell>

<Card sx={{ display: 'flex', height: '100%' }}>
  {/* Left Column */}
  <CardMedia
    component='img'
    image={nyumba}
    alt={order.p_name}
    height='40'
    width='40'
    sx={{ marginRight: '1rem' }} // Add margin to separate from the content on the right
  />

  {/* Right Column */}
  <CardContent>
    <Typography variant='body2' color='text.secondary' noWrap>
      {order.r_description}
    </Typography>

    <Typography variant='body2' color='text.secondary' noWrap>
      {order.p_name} {order.u_name}
    </Typography>
  </CardContent>
</Card>
      </TableCell>

      <TableCell>
      <Card sx={{ display: 'flex', height: '100%' }}> 
      <CardContent>
      <Typography variant='body2' color='text.secondary' noWrap>
      {order.r_phone}
    </Typography>
      </CardContent>
      </Card>
        </TableCell>


      <TableCell>
      <Card sx={{ display: 'flex', height: '100%' }}> 
      <CardContent>
      <Typography variant='body2' color='text.secondary' noWrap>
      {order.r_type}
    </Typography>
      </CardContent>
      </Card>
        </TableCell>

      <TableCell >
      <Card sx={{ display: 'flex', height: '100%' }}> 
      <CardContent>
<Typography variant='body2' color='text.secondary' sx={{
  backgroundColor: getStatusColor(order.r_status),
  color: 'white',
  fontSize: '0.5rem',
  borderRadius: '12px',
}} noWrap>
{order.r_status}
            </Typography>
            </CardContent>
      </Card>
  
</TableCell>
    </TableRow>
  ))
))}

    </div>
  )
}

export default repairsTable
