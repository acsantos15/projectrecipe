import React from 'react';
import { Box, Typography, CircularProgress, Alert, List, ListItem } from '@mui/material';

interface Props {
  groceryData: any;
  error: string;
  loading: boolean;
}

const GroceryDisplay: React.FC<Props> = ({ groceryData, error, loading }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!groceryData) return null;

  return (
    <Box>
      <Typography variant="h6">Generated Grocery List:</Typography>
      <List>
        {groceryData.response?.ingredients?.map((item: string, index: number) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
      {groceryData.response?.estimated_cost && (
        <Typography variant="body2">
          Estimated Cost: ${groceryData.response.estimated_cost}
        </Typography>
      )}
    </Box>
  );
};

export default GroceryDisplay;
