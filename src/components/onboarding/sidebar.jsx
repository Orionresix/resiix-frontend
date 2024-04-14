/* eslint-disable react/prop-types */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ApartmentIcon from '@mui/icons-material/Apartment'
import Logo from '../../assets/logo_white.png'
// import technician from '../../assets/technician_icon.svg'
import settings from '../../assets/settings_icon.svg'
import repair from '../../assets/request_icon.svg'
import workorder from '../../assets/workorder_icon.svg'
import ListItemWithLink from '../ListItemWithLink'

const drawerWidth = 300

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0),
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
          <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }}>
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
              icon={ <img src={repair} alt="Custom Icon" />}
              to='/dashboard/requests'
            />
            <ListItemWithLink
              label='Work Orders'
              icon={ <img src={workorder} alt="Custom Icon" />}
              to='/dashboard/orders'
            />
            <ListItemWithLink
              label='Properties'
              icon={<ApartmentIcon />}
              to='/dashboard/properties'
            />
             {/* <ListItemWithLink
              label='Technician'
              icon={ <img src={technician} alt="Custom Icon" />}
              to='#'
            /> */}
             <ListItemWithLink
              label='Settings'
              icon={ <img src={settings} alt="Custom Icon" />}
              to='#'
            />
          </List>
          <Divider />
        </Drawer>
        <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
      </Box>
    </div>
  )
}
