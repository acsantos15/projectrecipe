// src/App.tsx
import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeGen from './components/recipe/RecipeGen';
import GroceryGen from './components/grocery/GroceryGen';
import History from './components/history/HistoryDisplay';
import { ThemeContextProvider } from './utils/ThemeContext';
import Home from './components/common/Home';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe" element={<RecipeGen />} />
            <Route path="/grocery" element={<GroceryGen />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;