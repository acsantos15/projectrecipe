import React from 'react';
import { Box, Typography, Paper, Alert} from '@mui/material';
import loadingGif from '../assets/loading.gif';

interface RecipeDisplayProps {
  recipeData: any;
  error: string;
  loading: boolean;
}

const formatRecipe = (data: any): React.ReactNode => {
  if (!data || !data.response) return null;

  const recipe = data.response;
  const metadata = data.metadata || {};

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }} gutterBottom>{recipe.name}</Typography>

      {recipe.servings && (
        <Typography variant="body1">
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'inline'}}>
            Servings: 
          </Typography>
          {recipe.servings}
        </Typography>
      )}

      {recipe.cooking_time && (
        <Typography variant="body1">
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'inline'}}>
            Cooking Time: 
          </Typography>
          {recipe.cooking_time} minutes
        </Typography>
      )}

      {metadata.cuisine && (
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Cuisine: {metadata.cuisine}
        </Typography>
      )}

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Ingredients:
      </Typography>
      <ul>
        {(recipe.recipe || []).map((item: string, index: number) => (
          <li key={index}>
            <Typography variant="body2">{item}</Typography>
          </li>
        ))}
      </ul>

      <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main' }}>
        Steps:
      </Typography>
      <ol>
        {(recipe.steps || []).map((step: string, index: number) => (
          <li key={index}>
            <Typography variant="body2">{step}</Typography>
          </li>
        ))}
      </ol>
    </>
  );
};



const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeData, error, loading }) => {
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
          gap: 2,
        }}
      >
        <img src={loadingGif} alt="Loading..." style={{ width: 300, height: 300 }} />
      </Box>
    ) : recipeData ? (
      <Paper elevation={3} sx={{ p: 3 }}>
        {formatRecipe(recipeData)}
      </Paper>
    ) : error ? (
      <Alert severity="error">{error}</Alert>
    ) : null}
    </Box>
  );
};

export default RecipeDisplay;
