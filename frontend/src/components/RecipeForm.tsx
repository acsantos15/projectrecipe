import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Slider,
  Box,
  CircularProgress
} from '@mui/material';
import { RecipeFormData } from './RecipeGen';

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  loading: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, loading }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [servings, setServings] = useState<number>(4);
  const [flavorProfile, setFlavorProfile] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [equipmentInput, setEquipmentInput] = useState('');
  const [cookingTime, setCookingTime] = useState<number>(30);

  const cuisines = ['Italian', 'Japanese', 'Mexican', 'Korean', 'Indian', 'French', 'Thai', 'Filipino'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const diets = ['Vegetarian', 'Vegan', 'Keto', 'Halal', 'Gluten-Free', 'Dairy-Free'];
  const flavors = ['Sweet', 'Savory', 'Spicy', 'Sour', 'Bitter', 'Umami'];

  const addIngredient = () => {
    if (input.trim()) {
      setIngredients([...ingredients, input.trim()]);
      setInput('');
    }
  };

  const addEquipment = () => {
    if (equipmentInput.trim()) {
      setEquipment([...equipment, equipmentInput.trim()]);
      setEquipmentInput('');
    }
  };

  const toggleDiet = (diet: string) => {
    setDietaryPreferences(prev =>
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ingredients,
      cuisine,
      mealType,
      dietaryPreferences,
      servings,
      flavorProfile,
      equipment,
      cookingTime
    });
  };

  return (
    <Box sx={{ flex: 1, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Recipe Generator
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Ingredients Input */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Add Ingredient"
              fullWidth
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Button variant="contained" onClick={addIngredient}>
              Add
            </Button>
          </Stack>

          {/* Ingredient Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {ingredients.map((ing, i) => (
              <Chip
                key={i}
                label={ing}
                onDelete={() => setIngredients(ingredients.filter((_, j) => j !== i))}
                color="primary"
              />
            ))}
          </Stack>

          {/* Servings Input */}
          <FormControl fullWidth>
            <Typography gutterBottom>Servings: {servings}</Typography>
            <Slider
              value={servings}
              onChange={(e, newValue) => setServings(newValue as number)}
              min={1}
              max={12}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </FormControl>

          {/* Cooking Time Input */}
          <FormControl fullWidth>
            <Typography gutterBottom>Cooking Time: {cookingTime} minutes</Typography>
            <Slider
              value={cookingTime}
              onChange={(e, newValue) => setCookingTime(newValue as number)}
              min={5}
              max={180}
              step={5}
              marks={[
                { value: 5, label: '5m' },
                { value: 30, label: '30m' },
                { value: 60, label: '1h' },
                { value: 120, label: '2h' },
                { value: 180, label: '3h' },
              ]}
              valueLabelDisplay="auto"
            />
          </FormControl>

          {/* Cuisine Selector */}
          <FormControl fullWidth>
            <InputLabel>Cuisine</InputLabel>
            <Select value={cuisine} label="Cuisine" onChange={e => setCuisine(e.target.value)}>
              <MenuItem value="">Any</MenuItem>
              {cuisines.map(c => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Meal Type Selector */}
          <FormControl fullWidth>
            <InputLabel>Meal Type</InputLabel>
            <Select
              value={mealType}
              label="Meal Type"
              onChange={e => setMealType(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {meals.map(m => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Flavor Profile Selector */}
          <FormControl fullWidth>
            <InputLabel>Flavor Profile</InputLabel>
            <Select
              value={flavorProfile}
              label="Flavor Profile"
              onChange={e => setFlavorProfile(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {flavors.map(f => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Equipment Input */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Add Equipment"
              fullWidth
              value={equipmentInput}
              onChange={e => setEquipmentInput(e.target.value)}
            />
            <Button variant="contained" onClick={addEquipment}>
              Add
            </Button>
          </Stack>

          {/* Equipment Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {equipment.map((item, i) => (
              <Chip
                key={i}
                label={item}
                onDelete={() => setEquipment(equipment.filter((_, j) => j !== i))}
                color="secondary"
              />
            ))}
          </Stack>

          {/* Dietary Preferences */}
          <FormControl component="fieldset">
            <Typography variant="subtitle1">Dietary Preferences:</Typography>
            <FormGroup row>
              {diets.map(d => (
                <FormControlLabel
                  key={d}
                  control={
                    <Checkbox
                      checked={dietaryPreferences.includes(d)}
                      onChange={() => toggleDiet(d)}
                    />
                  }
                  label={d}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={ingredients.length === 0 || loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Recipe'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RecipeForm;