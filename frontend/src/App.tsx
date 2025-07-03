import React from 'react';
import './App.css';
import { CssBaseline, Button, Box, Stack, Avatar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeGen from './components/RecipeGen';
import logo from './logo.gif';
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
    <Avatar
      sx={{
        width: 500,
        height: 500,
        bgcolor: 'primary.main',
        fontSize: '2.5rem',
        mb: 3,
      }}
      src={logo}
    >
      ICON
    </Avatar>

    <h1>Recipe Generator</h1>

    <Stack direction="row" spacing={3} alignItems="center">
      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/recipe"
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          minWidth: 0,
        }}
      >
        RecipeGen
      </Button>

      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/grocery"
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          minWidth: 0,
        }}
      >
        GroceryGen
      </Button>
    </Stack>
  </Box>
);

// Placeholder for grocery generator
const GroceryGen: React.FC = () => (
  <Box p={4}>
    <h2>Grocery Generator (Coming Soon)</h2>
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
