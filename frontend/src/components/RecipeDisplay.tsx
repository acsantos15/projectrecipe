import React from 'react';
import { Box, Typography, Paper, Alert} from '@mui/material';
import loadingGif from '../assets/loading.gif';

interface RecipeDisplayProps {
  recipeHtml: string;
  error: string;
  loading: boolean;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeHtml, error, loading }) => {
  return (
    <Box sx={{ flex: 1, minHeight: 400 }}>
      {loading ? (
        <Box
          sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2, // Adds spacing between elements
          }}
        >
          <img src={loadingGif} alt="Loading..." style={{ width: 300, height: 300 }} />
        </Box>
      ) : recipeHtml ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Your Recipe
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: recipeHtml }} />
        </Paper>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : null}
    </Box>
  );
};

export default RecipeDisplay;
