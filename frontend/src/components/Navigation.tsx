import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DarkModeToggle } from '../components/DarkModeToggle';
import homeIcon from '../assets/home.gif';
import recipeIcon from '../assets/recipe.gif';
import groceryIcon from '../assets/grocery.gif';

const Navigation: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: 120,
      }}
    >
      <Stack spacing={2} alignItems="center">
      <DarkModeToggle />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/"
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
              src={homeIcon} 
              alt="Home" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Button>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '14px', }}>
            HOME
          </Typography>
        </Box>
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
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '14px', }}>
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
          <Typography variant="subtitle1" sx={{fontWeight: 'bold' , fontSize: '14px', }}>
            GROCERY LIST
          </Typography>
        </Box> 
      </Stack>
    </Box>
  );
};

export default Navigation;
