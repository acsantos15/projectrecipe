import React, { useState } from 'react';
import axios from 'axios';
import { Box, Stack } from '@mui/material';
import GroceryForm from './GroceryForm';
import GroceryDisplay from './GroceryDisplay';
import Navigation from './Navigation';

export interface GroceryFormData {
  meal_name: string;
  servings: number;
  budget_limit: number;
  region: string;
}

const GroceryGen: React.FC = () => {
  const [groceryData, setGroceryData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateGroceryList = async (formData: GroceryFormData) => {
    setError('');
    setGroceryData(null);
    setLoading(true);

    try {
      const res = await axios.post(
        'https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/grocery',
        formData
      );

      const responseData = typeof res.data?.body === 'string'
        ? JSON.parse(res.data.body)
        : res.data?.body || res.data;

      if (responseData.error || responseData.message) {
        throw new Error(responseData.error || responseData.message);
      }

      setGroceryData(responseData);
    } catch (err: any) {
      let errorMessage = 'Failed to generate grocery list';

      if (err.response) {
        try {
          const errorData = typeof err.response.data?.body === 'string'
            ? JSON.parse(err.response.data.body)
            : err.response.data?.body || err.response.data;
          errorMessage = errorData?.error || errorData?.message || errorMessage;
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

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <GroceryForm onSubmit={generateGroceryList} loading={loading} />
        <GroceryDisplay groceryData={groceryData} error={error} loading={loading} />
      </Stack>
      <Navigation />
    </Box>
  );
};

export default GroceryGen;
