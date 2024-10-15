import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#851919',
        color: 'white', // Change text color to white for better contrast
        p: 2,
        position: 'relative', // Changed to relative to accommodate content
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" align="center">
            <a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a> | 
            <a href="/terms" style={{ color: 'white', textDecoration: 'none' }}> Terms of Service</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
