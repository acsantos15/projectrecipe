import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Paper, 
  Typography, 
  InputAdornment,
  CircularProgress,
  Box,
  Divider
} from '@mui/material';
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
    <Paper elevation={3} sx={{ 
      p: 4, 
      borderRadius: 2,
      maxWidth: 500,
      mx: 'auto',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          mb: 3,
          color: 'primary.main',
          textAlign: 'center'
        }}
      >
        Grocery List Generator
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            name="meal_name"
            label="Meal Name"
            value={formData.meal_name}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="e.g. Chicken Adobo"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span role="img" aria-label="meal">🍲</span>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              name="servings"
              label="Servings"
              type="number"
              value={formData.servings}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                inputProps: { min: 1, max: 20 },
                startAdornment: (
                  <InputAdornment position="start">
                    <span role="img" aria-label="people">👨‍👩‍👧‍👦</span>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              name="budget_limit"
              label="Budget (₱)"
              type="number"
              value={formData.budget_limit}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">
                    <span role="img" aria-label="money">💰</span>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            fullWidth
            name="region"
            label="Region/Country"
            value={formData.region}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="e.g. Philippines"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span role="img" aria-label="globe">🌏</span>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Generate Grocery List'
              )}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default GroceryForm;
