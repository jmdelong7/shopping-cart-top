import { Container, Typography, Box } from '@mui/material';

const Products = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Product catalog will be implemented in Phase 2
        </Typography>
      </Box>
    </Container>
  );
};

export default Products;