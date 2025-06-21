import { Container, Typography, Box } from '@mui/material';

const Cart = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Cart functionality will be implemented in Phase 2
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;