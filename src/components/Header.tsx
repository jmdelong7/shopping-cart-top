import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Shopping Cart
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{
              textDecoration: isActive('/') ? 'underline' : 'none',
              '&:hover': {
                textDecoration: isActive('/') ? 'underline' : 'none',
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/products')}
            sx={{
              textDecoration: isActive('/products') ? 'underline' : 'none',
              '&:hover': {
                textDecoration: isActive('/products') ? 'underline' : 'none',
              },
            }}
          >
            Products
          </Button>
          
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={state.totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;