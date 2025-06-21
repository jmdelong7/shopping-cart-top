import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider,
  Alert
} from '@mui/material';
import { 
  ShoppingBag as ShoppingBagIcon, 
  ShoppingCart as ShoppingCartIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (state.items.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Shopping Cart
          </Typography>
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <ShoppingBagIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleContinueShopping}
              startIcon={<ShoppingCartIcon />}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1">
            Shopping Cart
          </Typography>
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleClearCart}
            startIcon={<ClearIcon />}
          >
            Clear Cart
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Items in Cart ({state.totalItems} {state.totalItems === 1 ? 'item' : 'items'})
            </Typography>
            
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '300px' } }}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Items ({state.totalItems}):
                </Typography>
                <Typography variant="body1">
                  {formatPrice(state.totalPrice)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">
                  Total:
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {formatPrice(state.totalPrice)}
                </Typography>
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ mb: 2 }}
                disabled
              >
                Proceed to Checkout
              </Button>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Checkout functionality coming soon!
              </Alert>

              <Button 
                variant="text" 
                fullWidth 
                onClick={handleContinueShopping}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;