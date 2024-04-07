/* eslint-disable react/prop-types */
import React from 'react'
import { Paper, Typography } from '@mui/material'
import {
  AcUnit,
  Bolt,
  Handyman,
  Plumbing,
  SentimentVeryDissatisfied,
} from '@mui/icons-material'

const Stats = ({ stats, type }) => {
  const icons = {
    electrical: <Bolt sx={{ fontSize: '60px', color: 'red' }} />,
    plumbing: <Plumbing sx={{ fontSize: '60px', color: 'blue' }} />,
    general: <Handyman sx={{ fontSize: '60px', color: 'purple' }} />,
    ac: <AcUnit sx={{ fontSize: '60px', color: 'green' }} />,
    overdue: (
      <SentimentVeryDissatisfied sx={{ fontSize: '60px', color: 'orange' }} />
    ),
  }
  const subText = {
    electrical: 'Electrical Requests',
    plumbing: 'Plumbing',
    general: 'General repairs',
    ac: 'Air conditioning',
    overdue: 'Overdue work orders',
  }
  return (
    <Paper
      style={{
        padding: '20px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        width: '200px',
        flexDirection: 'column',
      }}>
      {icons[type]}
      <Typography>{stats}</Typography>
      <Typography>{subText[type]} </Typography>
    </Paper>
  )
}

export default Stats