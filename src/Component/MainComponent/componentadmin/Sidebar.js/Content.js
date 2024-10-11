import React, { useState } from 'react';
// import { Typography, Grid, Paper } from '@mui/material';
import { Grid, Paper, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ShopForm from '../Shopcomponent/Shopform';


const Content = () => {

  const [open, setOpen] = useState(false); // State to control the modal

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
    return (
        <>
       
          <div>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={3}>
      {/* Card 1 */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <DashboardIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Dashboard</Typography>
            <Typography variant="body2">View your stats and metrics.</Typography>
          </div>
        </Paper>
      </Grid>
      {/* Card 2 */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">New Order</Typography>
            <Typography variant="body2">Manage your account Order.</Typography>
          </div>
        </Paper>
      </Grid>
      {/* Card 3 */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <SettingsIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Total product</Typography>
            <Typography variant="body2">Customize your product.</Typography>
          </div>
        </Paper>
      </Grid>
      {/* Card 4 */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <InfoIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Pending Orders</Typography>
            <Typography variant="body2">Find helpful pending orders.</Typography>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Profile</Typography>
            <Typography variant="body2">Manage your account settings.</Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Rejected orders</Typography>
            <Typography variant="body2">Manage your rejected orders.</Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Daily sale</Typography>
            <Typography variant="body2">Manage your daily <br/>sale.</Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
            <Typography variant="h6">Add product</Typography>
            <Typography variant="body2">Manage your add product.</Typography>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ padding: 3, display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: ' #851919', marginRight: 2 }} />
          <div>
           <Link to='/shopform'> <Typography variant="h6"><h5>Add To Shop</h5></Typography></Link>
            <Typography variant="body2">Manage your add product.</Typography>
          </div>
        </Paper>
      </Grid>
        </Grid>
     
    {/* </Grid> */}
          </div>
          {/* <ShopForm show={open} handleClose={handleClose} /> */}
        </>
      );
    }      

export default Content;
