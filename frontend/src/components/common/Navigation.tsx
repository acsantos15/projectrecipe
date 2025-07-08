import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';
import homeIcon from '../../assets/home.gif';
import recipeIcon from '../../assets/recipe.gif';
import groceryIcon from '../../assets/grocery.gif';
import historyIcon from '../../assets/history.gif';

const Navigation: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        height: { xs: 80, sm: '100vh' },
        width: { xs: '100%', sm: 120 },
        bottom: { xs: 0, sm: 'auto' },
        top: { xs: 'auto', sm: 0 },
        right: 0,
        left: { xs: 0, sm: 'auto' },
        backgroundColor: 'background.paper',
        boxShadow: 3,
        zIndex: 1000,
      }}
    >
      <Stack
        spacing={{ xs: 1, sm: 0.5 }}
        alignItems="center"
        direction={{ xs: 'row', sm: 'column' }}
        justifyContent={{ xs: 'space-around', sm: 'flex-start' }}
        sx={{ height: '100%', width: '100%', p: 1 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <DarkModeToggle />
        </Box>

        {/* Home */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/"
            sx={{
              width: { xs: 60, sm: 100 },
              height: { xs: 60, sm: 100 },
              minWidth: 0,
              p: 0,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src={homeIcon}
              alt="Home"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Button>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '14px' } }}
          >
            HOME
          </Typography>
        </Box>

        {/* Recipe */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/recipe"
            sx={{
              width: { xs: 60, sm: 100 },
              height: { xs: 60, sm: 100 },
              minWidth: 0,
              p: 0,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src={recipeIcon}
              alt="Recipe Generator"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Button>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '14px' } }}
          >
            RECIPE
          </Typography>
        </Box>

        {/* Grocery */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/grocery"
            sx={{
              width: { xs: 60, sm: 100 },
              height: { xs: 60, sm: 100 },
              minWidth: 0,
              p: 0,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src={groceryIcon}
              alt="Grocery Generator"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Button>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '14px' } }}
          >
            GROCERY LIST
          </Typography>
        </Box>

        {/* History */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component={Link}
            to="/history"
            sx={{
              width: { xs: 60, sm: 100 },
              height: { xs: 60, sm: 100 },
              minWidth: 0,
              p: 0,
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            <img
              src={historyIcon}
              alt="History"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Button>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '10px', sm: '14px' } }}
          >
            HISTORY
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Navigation;
