/* eslint-disable react/prop-types */
import React from 'react'
import {Paper, Box , Typography} from '@mui/material'

const Stats = ({ stats }) => {
  const columnSize = stats.length === 3 ? 4 : 3
  return (
    <Paper
      style={{
        backgroundColor: '#FFFFFF',
      }}>
      <Box container xs={12}  display='flex' justifyContent='space-evenly'  >
        {stats.map((item, index) => (
          <Box key={index} xs={columnSize}   >
            {item.icon}
            <Typography variant='h5' style={{ color: '#00B286' }}>
              {item.data}
            </Typography>
            <Typography variant='h6' style={{ color: '#868E96' }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default Stats