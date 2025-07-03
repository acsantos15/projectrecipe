import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { DarkModeToggle } from '../components/DarkModeToggle';

const Navigation: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: 120,
        bgcolor: 'grey.200',
        p: 2,
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Button
          variant="contained"
          component={Link}
          to="/"
          fullWidth
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            minWidth: 0,
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/recipe"
          fullWidth
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            minWidth: 0,
          }}
        >
          Recipe
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/grocery"
          fullWidth
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            minWidth: 0,
          }}
        >
          Grocery
        </Button>

        <DarkModeToggle />
      </Stack>
    </Box>
  );
};

export default Navigation;
