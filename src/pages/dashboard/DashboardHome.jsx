import React, { useEffect } from 'react';
import Stats from '../../components/Dashboard/Stats';
import { Box, Grid, Button } from '@mui/material';
import {Link} from 'react-router-dom';
// import TicketCard from '../../components/TicketCard'; // Assuming you have a TicketCard component

import TicketComponent from '../../components/Ticket'
import dummyTickets  from '../dashboard/dummyTickets';

const DashboardHome = () => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // One week ago

  const displayTickets = dummyTickets.slice(0, 6);

  const stats = {
    electrical: dummyTickets.filter(
      (ticket) =>
        (ticket.status === 'Open' || ticket.status === 'In Progress') &&
        ticket.type === 'electrical'
    ).length,
    plumbing: dummyTickets.filter(
      (ticket) =>
        (ticket.status === 'Open' || ticket.status === 'In Progress') &&
        ticket.type === 'plumbing'
    ).length,
    general: dummyTickets.filter(
      (ticket) =>
        (ticket.status === 'Open' || ticket.status === 'In Progress') &&
        ticket.type === 'general'
    ).length,
    ac: dummyTickets.filter(
      (ticket) =>
        (ticket.status === 'Open' || ticket.status === 'In Progress') &&
        ticket.type === 'ac'
    ).length,
    overdue: dummyTickets.filter(
      (ticket) =>
        (ticket.status === 'Open' || ticket.status === 'In Progress') &&
        new Date(ticket.date) <= weekAgo
    ).length,
  };
  useEffect(() => {
    console.log(stats);
  }, []);

  return (
    <Box sx={{ padding: '50px', display: 'flex', flexDirection: 'column' }}>
      <Box display='flex' justifyContent='space-evenly'>
        <Stats stats={stats.electrical} type='electrical' />
        <Stats stats={stats.plumbing} type='plumbing' />
        <Stats stats={stats.general} type='general' />
        <Stats stats={stats.ac} type='ac' />
        <Stats stats={stats.overdue} type='overdue' />
      </Box>
      <Box className='dailyRequests'>
        <Box display='flex'>
          <Grid container spacing={2}>
            {displayTickets.map((ticket, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TicketComponent ticket={ticket} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box alignSelf={'flex-end'} marginTop='20px'>
        <Link href='/dashboard/requests'>
          <Button variant='outlined'>View More</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default DashboardHome;
