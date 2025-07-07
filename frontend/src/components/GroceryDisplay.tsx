import React from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Paper,
  Stack
} from '@mui/material';
import loadingGif from '../assets/loading2.gif';

interface Props {
  groceryData: any;
  error: string;
  loading: boolean;
}

const GroceryDisplay: React.FC<Props> = ({ groceryData, error, loading }) => {
  if (loading) return (
    <Box 
        sx={{
            height: 400,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
    >
      <img 
        src={loadingGif} 
        alt="Loading..." 
        style={{ width: '100px', height: '100px' }} 
      />
    </Box>
  );
  
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!groceryData) return null;

  // Extract data from nested structure
  const responseData = groceryData.response?.response || groceryData.response;
  const metadata = groceryData.metadata || groceryData.response?.metadata;
  
  const mealName = responseData?.meal_name || metadata?.meal_name || 'Meal Details';
  const servings = responseData?.servings || metadata?.servings || 1;
  const totalCost = parseFloat(responseData?.estimated_cost) || 0;
  const budgetLimit = parseFloat(metadata?.budget_limit) || 0;
  const region = metadata?.region || 'PH/Philippines';
  const ingredients = responseData?.ingredients || [];

  return (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          {mealName}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip label={`Servings: ${servings}`} />
          <Chip label={`Region: ${region}`} />
          <Chip 
            label={`Total: ₱${totalCost.toFixed(2)}`} 
            color={budgetLimit > 0 && totalCost > budgetLimit ? 'error' : 'success'}
            variant="outlined"
          />
          {budgetLimit > 0 && (
            <Chip label={`Budget: ₱${budgetLimit.toFixed(2)}`} />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" component="h3" gutterBottom>
          Ingredients:
        </Typography>
        
        <List sx={{ width: '100%' }}>
          {ingredients.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemText
                  primary={`${item.name}`}
                  secondary={`${item.quantity}`}
                  sx={{ flex: 2 }}
                />
                <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
                  ₱{parseFloat(item.price).toFixed(2)}
                </Typography>
              </ListItem>
              {index < ingredients.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 1
        }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Total Cost:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ₱{totalCost.toFixed(2)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default GroceryDisplay;