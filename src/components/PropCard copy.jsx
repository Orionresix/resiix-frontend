/* eslint-disable react/prop-types */
import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Link,
  Divider,
} from '@mui/material'

const PropCard = ({ p_id, p_manager_id, p_name, link, p_num_units }) => {
  // Adjust default height as needed
  return (
    <Link href={link} target='_blank' underline='none'>
      <Card sx={{ height: '100%' }}>
        <CardActionArea>
          <CardMedia component='img' image={p_manager_id} alt={p_id} height='140' />
          <CardContent>
            <p> </p>
            <Typography
              variant='subtitle1'
              color='text.primary'
              sx={{ fontWeight: 'bold' }}>
              {p_id}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap>
              {p_name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions sx={{ backgroundColor: '#F8F9FA' }}>
          <Typography sx={{ color: 'grey', fontSize: 12 }}>
            {p_num_units} units
          </Typography>
        </CardActions>
      </Card>
    </Link>
  )
}

export default PropCard
