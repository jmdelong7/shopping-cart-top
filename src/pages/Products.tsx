import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  TextField
} from '@mui/material';
import { Refresh as RefreshIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { fetchProducts } from '../data/products';
import { Product } from '../types';
import { formatPrice, validateQuantity } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addItem } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      // Initialize quantities to 1 for each product
      const initialQuantities: Record<number, number> = {};
      fetchedProducts.forEach(product => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleRetry = () => {
    loadProducts();
  };

  const getQuantity = (productId: number) => quantities[productId] || 1;

  const updateQuantity = (productId: number, newQuantity: number, maxStock: number) => {
    const validatedQuantity = validateQuantity(newQuantity, maxStock);
    setQuantities(prev => ({
      ...prev,
      [productId]: validatedQuantity
    }));
  };

  const handleQuantityChange = (productId: number, value: string, maxStock: number) => {
    const numValue = parseInt(value) || 1;
    updateQuantity(productId, numValue, maxStock);
  };

  const increaseQuantity = (productId: number, maxStock: number) => {
    const currentQuantity = getQuantity(productId);
    updateQuantity(productId, currentQuantity + 1, maxStock);
  };

  const decreaseQuantity = (productId: number, maxStock: number) => {
    const currentQuantity = getQuantity(productId);
    updateQuantity(productId, currentQuantity - 1, maxStock);
  };

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    addItem(product, quantity);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ 
          py: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh'
        }}>
          <CircularProgress size={48} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading products...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Products
          </Typography>
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleRetry}
                startIcon={<RefreshIcon />}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Products
          </Typography>
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography variant="h5" gutterBottom color="text.secondary">
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We couldn't find any products at the moment.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleRetry}
              startIcon={<RefreshIcon />}
            >
              Try Again
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover our collection of {products.length} amazing products
        </Typography>
        
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 1 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {formatPrice(product.price)}
                  </Typography>
                  {product.rating && (
                    <Typography variant="body2" color="text.secondary">
                      ⭐ {product.rating.rate}/5 ({product.rating.count} reviews)
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <IconButton 
                      size="small"
                      onClick={() => decreaseQuantity(product.id, product.stock)}
                      disabled={getQuantity(product.id) <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      size="small"
                      type="number"
                      value={getQuantity(product.id)}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value, product.stock)}
                      inputProps={{ 
                        min: 1, 
                        max: product.stock,
                        style: { textAlign: 'center' }
                      }}
                      sx={{ width: '80px' }}
                    />
                    <IconButton 
                      size="small"
                      onClick={() => increaseQuantity(product.id, product.stock)}
                      disabled={getQuantity(product.id) >= product.stock}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock < 1}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Products;