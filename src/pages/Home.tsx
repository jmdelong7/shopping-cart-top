import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom color="primary">
          Welcome to Shopping Cart
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, color: 'text.secondary' }}>
          Discover amazing products and build your perfect cart
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{ px: 4, py: 1.5 }}
        >
          Start Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default Home;