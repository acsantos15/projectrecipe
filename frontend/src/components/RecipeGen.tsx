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
        'https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/ask',
        formData
      );

      // Handle response parsing
      let responseData = typeof res.data.body === 'string' 
        ? JSON.parse(res.data.body) 
        : res.data.body;

      // Check for error in response
      if (responseData.error) {
        throw new Error(responseData.details || responseData.error);
      }

      // Try to extract recipe from different response formats
      const recipeObj = responseData.response || responseData;
      if (!recipeObj || typeof recipeObj !== 'object') {
        throw new Error('Received invalid recipe format from server');
      }

      // Format and display the recipe
      setRecipeHtml(formatRecipe(recipeObj));

    } catch (err: any) {
      console.error('Recipe generation error:', err);
      
      // Handle different error formats
      let errorMessage = 'Failed to generate recipe';
      if (err.response) {
        const errorData = typeof err.response.data.body === 'string'
          ? JSON.parse(err.response.data.body)
          : err.response.data.body;
        errorMessage = errorData?.details || errorData?.error || errorMessage;
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

  const formatRecipe = (recipeObj: any) => {
    return `
      <h3>${recipeObj.name}</h3>
      ${recipeObj.servings ? `<p><strong>Servings:</strong> ${recipeObj.servings}</p>` : ''}
      ${recipeObj.cooking_time || recipeObj.cookingTime ? 
        `<p><strong>Cooking Time:</strong> ${recipeObj.cooking_time || recipeObj.cookingTime} minutes</p>` : ''}
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