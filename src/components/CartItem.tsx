import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  TextField
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CartItem as CartItemType } from '../types';
import { formatPrice, calculateItemSubtotal, validateQuantity } from '../utils/helpers';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    const validatedQuantity = validateQuantity(numValue, item.product.stock);
    updateQuantity(item.product.id, validatedQuantity);
  };

  const increaseQuantity = () => {
    if (item.quantity < item.product.stock) {
      updateQuantity(item.product.id, item.quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id);
  };

  const subtotal = calculateItemSubtotal(item);

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, objectFit: 'contain', p: 1 }}
        image={item.product.image}
        alt={item.product.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {item.product.description.length > 100 
                ? `${item.product.description.substring(0, 100)}...` 
                : item.product.description
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {formatPrice(item.product.price)} • Stock: {item.product.stock}
            </Typography>
          </Box>
          <IconButton 
            onClick={handleRemove}
            color="error"
            sx={{ alignSelf: 'flex-start' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Quantity:</Typography>
            <IconButton 
              size="small"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              inputProps={{ 
                min: 1, 
                max: item.product.stock,
                style: { textAlign: 'center' }
              }}
              sx={{ width: '80px' }}
            />
            <IconButton 
              size="small"
              onClick={increaseQuantity}
              disabled={item.quantity >= item.product.stock}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {formatPrice(subtotal)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;