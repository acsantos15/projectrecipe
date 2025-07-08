import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { fetchRecipe } from '../../services/recipeService';
import { RecipeFormData, RecipeResponse } from '../../types/recipeType';
import RecipeForm from '../recipe/RecipeForm';
import RecipeDisplay from '../recipe/RecipeDisplay';
import Navigation from '../common/Navigation';

const RecipeGenerator: React.FC = () => {
  const [recipeData, setRecipeData] = useState<RecipeResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const generateRecipe = async (formData: RecipeFormData) => {
    setError('');
    setRecipeData(null);
    setLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetchRecipe(formData, controller.signal);

      if (response?.response?.error) {
        setError(response.response.error);
        setRecipeData(response);
        return;
      }

      if (!response?.response || typeof response.response !== 'object') {
        throw new Error('Received invalid recipe format from server');
      }

      setRecipeData(response);
    } catch (err: any) {
      let errorMessage = 'Failed to generate recipe';
      if (err.response) {
        try {
          const errorData = typeof err.response.data?.body === 'string'
            ? JSON.parse(err.response.data.body)
            : err.response.data?.body || err.response.data;

          if (errorData?.response?.error) {
            setRecipeData(errorData);
            errorMessage = errorData.response.error;
          } else {
            errorMessage = errorData?.details || errorData?.error || errorData?.message || errorMessage;
          }
        } catch {
          errorMessage = 'Invalid error response format';
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (abortController) {
      abortController.abort();
    }
    setIsCanceling(true);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setIsCanceling(false);
    setLoading(false);
    setError('Request cancelled by user');
  };

  return (
    <Box sx={{ p: 4, pr: { xs: 2, md: '140px' }, pb: { xs: '160px', md: 4 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
        <RecipeForm onSubmit={generateRecipe} loading={loading} isCanceling={isCanceling} onCancel={handleCancel} />
        <RecipeDisplay recipeData={recipeData} error={error} loading={loading} isCanceling={isCanceling} />
      </Stack>
      <Navigation />
    </Box>
  );
};

export default RecipeGenerator;
