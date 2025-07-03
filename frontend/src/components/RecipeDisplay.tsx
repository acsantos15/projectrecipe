import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';

interface RecipeDisplayProps {
  recipeHtml: string;
  error: string;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeHtml, error }) => {
  return (
    <Box sx={{ flex: 1, maxWidth: 1000 }}>
      {recipeHtml && (
        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Your Recipe
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: recipeHtml }} />
        </Paper>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default RecipeDisplay;