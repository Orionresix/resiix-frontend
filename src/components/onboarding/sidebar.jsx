/* eslint-disable react/prop-types */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HandymanIcon from '@mui/icons-material/Handyman'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ApartmentIcon from '@mui/icons-material/Apartment'
import Logo from '../../assets/logo_white.png'
import ListItemWithLink from '../ListItemWithLink'

const drawerWidth = 300

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function VerticalSidebar({ children }) {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          open={true}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#00B286',
            },
          }}
          variant='persistent'
          anchor='left'>
          <DrawerHeader>
            <img src={Logo} alt='' style={{ maxWidth: '100%' }} />
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemWithLink
              label='Dashboard'
              icon={<DashboardIcon />}
              to='/dashboard/home'
            />
            <ListItemWithLink
              label='Repair Requests'
              icon={<HandymanIcon />}
              to='/dashboard/requests'
            />
            <ListItemWithLink
              label='Work Orders'
              icon={<AssignmentIcon />}
              to='/dashboard/orders'
            />
            <ListItemWithLink
              label='Properties'
              icon={<ApartmentIcon />}
              to='/dashboard/properties'
            />
             <ListItemWithLink
              label='Technician'
              icon={<ApartmentIcon />}
              to='/dashboard/properties'
            />
             <ListItemWithLink
              label='Settings'
              icon={<ApartmentIcon />}
              to='/dashboard/properties'
            />
          </List>
          <Divider />
        </Drawer>
        <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
      </Box>
    </div>
  )
}
