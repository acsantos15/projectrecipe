import React from 'react';
import './App.css';
import { CssBaseline, Button, Box, Stack, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeGen from './components/RecipeGen';
import GroceryGen from './components/GroceryGen';
import logo from './assets/mainicon.jpg';
import recipeIcon from './assets/recipe.gif';
import groceryIcon from './assets/grocery.gif';
import { ThemeContextProvider } from './utils/ThemeContext';

const Home: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    gap={4}
  >
    <Box
      component="img"
      src={logo}
      alt="App Logo"
      sx={{
        width: 400,
        height: 400,
      }}
    />

    <Typography 
      variant="h2" 
      component="h1" 
      sx={{ 
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 3
      }}
    >
      CookGPT
    </Typography>

    <Typography variant="h5" sx={{ mb: 3 }}>
      Choose what to generate:
    </Typography>

    <Stack direction="row" spacing={6} alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          component={Link}
          to="/recipe"
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            minWidth: 0,
            p: 0,
            overflow: 'hidden',
            backgroundColor: 'transparent'
          }}
        >
          <img 
            src={recipeIcon} 
            alt="Recipe Generator" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
          RECIPE
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          component={Link}
          to="/grocery"
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            minWidth: 0,
            p: 0,
            overflow: 'hidden',
            backgroundColor: 'transparent'
          }}
        >
          <img 
            src={groceryIcon} 
            alt="Grocery Generator" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
          GROCERY LIST
        </Typography>
      </Box>
    </Stack>
  </Box>
);

const App: React.FC = () => {
  return (
    <>
      <ThemeContextProvider>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe" element={<RecipeGen />} />
              <Route path="/grocery" element={<GroceryGen />} />
            </Routes>
          </div>
        </Router>
      </ThemeContextProvider>
    </>
  );
};

export default App;