import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import {
  Box,
  Stack,
} from '@mui/material';
import RecipeForm from './RecipeForm';
import RecipeDisplay from './RecipeDisplay';

const RecipeGenerator: React.FC = () => {
  const [recipeHtml, setRecipeHtml] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRecipe = async (formData: RecipeFormData) => {
    setError('');
    setRecipeHtml('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/recipe',
        formData
      );

      // Handle response parsing more safely
      let responseData;
      try {
        responseData = typeof res.data?.body === 'string' 
          ? JSON.parse(res.data.body) 
          : res.data?.body || res.data;
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid server response format');
      }

      // Check for error in response (multiple possible error formats)
      if (!responseData) {
        throw new Error('Empty response from server');
      }

      if (responseData.error || responseData.message) {
        throw new Error(responseData.details || responseData.error || responseData.message);
      }

      // Check for the expected recipe response format
      if (!responseData.response || typeof responseData.response !== 'object') {
        throw new Error('Received invalid recipe format from server');
      }

      // Format and display the recipe
      setRecipeHtml(formatRecipe(responseData));

    } catch (err: any) {
      console.error('Recipe generation error:', err);
      
      // Handle different error formats
      let errorMessage = 'Failed to generate recipe';
      if (err.response) {
        // Try to extract error message from axios error response
        try {
          const errorData = typeof err.response.data?.body === 'string'
            ? JSON.parse(err.response.data.body)
            : err.response.data?.body || err.response.data;
          errorMessage = errorData?.details || errorData?.error || errorData?.message || errorMessage;
        } catch (parseError) {
          errorMessage = 'Invalid error response format';
        }
      } else if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatRecipe = (responseData: any) => {
    const recipeObj = responseData.response;
    const metadata = responseData.metadata || {};
    
    return `
      <h3>${recipeObj.name}</h3>
      ${recipeObj.servings ? `<p><strong>Servings:</strong> ${recipeObj.servings}</p>` : ''}
      ${recipeObj.cooking_time ? 
        `<p><strong>Cooking Time:</strong> ${recipeObj.cooking_time} minutes</p>` : ''}
      
      ${metadata.ingredients ? `
        <p><strong>Requested Ingredients:</strong> ${metadata.ingredients.join(', ')}</p>
      ` : ''}
      
      ${metadata.cuisine ? `
        <p><strong>Cuisine:</strong> ${metadata.cuisine}</p>
      ` : ''}
      
      <strong>Ingredients:</strong>
      <ul>${(recipeObj.recipe || []).map((item: string) => `<li>${item}</li>`).join('')}</ul>
      
      <strong>Steps:</strong>
      <ol>${(recipeObj.steps || []).map((step: string) => `<li>${step}</li>`).join('')}</ol>
      
      ${recipeObj.equipment ? `
        <strong>Equipment:</strong>
        <ul>${recipeObj.equipment.map((item: string) => `<li>${item}</li>`).join('')}</ul>
      ` : ''}
    `;
  };

  return (
    <Box
      sx={{
        p: 4,
        pr: { xs: 2, md: '140px' },
        pb: { xs: '160px', md: 4 }, 
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
        <RecipeForm onSubmit={generateRecipe} loading={loading} />
        <RecipeDisplay recipeHtml={recipeHtml} error={error} loading={loading} />
      </Stack>
      <Navigation />
    </Box>
  );
};

export default RecipeGenerator;

export interface RecipeFormData {
  ingredients: string[];
  cuisine: string;
  mealType: string;
  dietaryPreferences: string[];
  servings: number;
  flavorProfile: string;
  equipment: string[];
  cookingTime: number;
}