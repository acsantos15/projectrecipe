import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { GroceryFormData } from './GroceryGen';

interface Props {
  onSubmit: (data: GroceryFormData) => void;
  loading: boolean;
}

const GroceryForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<GroceryFormData>({
    meal_name: '',
    servings: 1,
    budget_limit: 0,
    region: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'servings' || name === 'budget_limit' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="meal_name"
          label="Meal Name"
          value={formData.meal_name}
          onChange={handleChange}
          required
        />
        <TextField
          name="servings"
          label="Servings"
          type="number"
          value={formData.servings}
          onChange={handleChange}
          required
        />
        <TextField
          name="budget_limit"
          label="Budget Limit"
          type="number"
          value={formData.budget_limit}
          onChange={handleChange}
          required
        />
        <TextField
          name="region"
          label="Region"
          value={formData.region}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" disabled={loading}>
          Generate Grocery List
        </Button>
      </Stack>
    </form>
  );
};

export default GroceryForm;
