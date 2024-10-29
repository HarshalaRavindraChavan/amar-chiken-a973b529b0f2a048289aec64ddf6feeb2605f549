import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import AddShoppingCartIcon from '@mui/icons-icons-material/AddShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'} // Use temporary drawer for mobile
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      anchor="left"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
    >
      <Toolbar />
      <List>
        <ListItem button style={{ backgroundColor: '#851919', height: '70px' }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {/* <AddShoppingCartIcon /> */}
          </ListItemIcon>
          <ListItemText primary="New Order" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Total Product" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText primary="Pending Order" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Rejected Orders" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {/* <AttachMoneyIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Daily Sale" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {/* <AddShoppingCartIcon /> */}
          
          </ListItemIcon>

          <Link to='/addproduct'style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Add Product" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            {/* <AddShoppingCartIcon /> */}
          </ListItemIcon>
        
          <Link to="/shopadd" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Add To Shop" />
          </Link>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            {/* <AddShoppingCartIcon /> */}
          </ListItemIcon>
          <Link to="/shoptale" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Total Shop" />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
