/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Stats = ({ stats }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', // Change to wrap to allow items to wrap onto the next line
        justifyContent: 'center',
        alignContent: 'left',
        gap: '40px',
        overflowX: 'auto',
        padding: '30px' // Allow horizontal scrolling for smaller screens
      }}
    >
      {stats.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={index}
          sx={{
            backgroundColor: '#FFFFFF',
            width: '202px',
            height: '186px',
            padding: '20px',
            borderRadius: '4px',
            filter: 'drop-shadow(-4px 9px 15px rgba(0,0,0,0.1))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {item.icon}
          <Typography variant="h4" style={{ color: '#00B286', marginTop: '12px' }}>
            {item.data}
          </Typography>
          <Typography variant="h6" style={{ color: '#868E96', marginTop: '8px' }}>
            {item.title}
          </Typography>
        </Grid>
      ))}
    </Box>
  );
};

export default Stats;
