import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import Navigation from '../common/Navigation';

type Recipe = {
  id: string;
  cuisine: string;
  ingredients: string[];
  dietary: string[];
  nutrition: string[];
  createdAt: number;
  recipe: {
    name: string;
    servings: number;
    cooking_time: number;
    nutrition: string[];
    recipe: string[];
    equipment: string[];
    steps: string[];
  };
};

const RecipeHistory: React.FC = () => {
  const [history, setHistory] = useState<Recipe[]>([]);
  const [selected, setSelected] = useState<Recipe | null>(null);

  useEffect(() => {
    axios
      .get<Recipe[]>('https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/history') 
      .then((res) => setHistory(res.data))
      .catch((err) => console.error('Failed to fetch history:', err));
  }, []);

  return (
    <Box
        sx={{
        p: 4,
        pr: { xs: 2, md: '140px' },
        pb: { xs: '160px', md: 4 }, 
        }}
    >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
      {/* Left list */}
      <Box width="30%" borderRight="1px solid #ccc" pr={2} overflow="auto">
        <Typography variant="h6" gutterBottom>
          Recipe List
        </Typography>
        <List>
          {history.map((entry) => (
            <ListItemButton
              key={entry.id}
              selected={selected?.id === entry.id}
              onClick={() => setSelected(entry)}
            >
              <ListItemText primary={entry.recipe.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Right detail panel */}
      <Box flex="1" pl={2} overflow="auto">
        {selected ? (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {selected.recipe.name}
              </Typography>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Servings: {selected.recipe.servings} | Cooking Time: {selected.recipe.cooking_time} mins
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">Nutrition:</Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {selected.recipe.nutrition.map((n, i) => (
                  <Chip key={i} label={n} size="small" />
                ))}
              </Box>

              <Typography variant="subtitle1">Ingredients:</Typography>
              <ul>
                {selected.recipe.recipe.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <Typography variant="subtitle1" mt={2}>
                Steps:
              </Typography>
              {selected.recipe.steps.map((step, i) => (
                <Typography key={i} variant="body2" paragraph>
                  {step}
                </Typography>
              ))}

              <Typography variant="caption" display="block" mt={2} color="textSecondary">
                Created: {new Date(Number(selected.createdAt.toString().slice(0, 13))).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Select a recipe to view details.
          </Typography>
        )}
      </Box>
        </Stack>
      <Navigation />
    </Box>
  );
};

export default RecipeHistory;
