// src/components/home/Home.tsx
import React from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Zoom, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/mainicon.png';
import recipeIcon from '../../assets/recipe.gif';
import groceryIcon from '../../assets/grocery.gif';
import historyIcon from '../../assets/history.gif';
import { DarkModeToggle } from '../common/DarkModeToggle';

const Home: React.FC = () => (
  <Box
    sx={{
      position: 'relative', // Needed for absolute positioning of toggle
      minHeight: '100vh',
    }}
  >
    {/* Dark Mode Toggle in top right corner */}
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1, // Ensure it's above other elements
      }}
    >
      <DarkModeToggle />
    </Box>

    {/* Main content */}
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={4}
      p={3} // Add some padding
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
        {/* Recipe Card */}
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <Card sx={{ 
            width: 200, 
            borderRadius: 4,
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 6
            }
          }}>
            <CardActionArea component={Link} to="/recipe">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box
                  component="img"
                  src={recipeIcon}
                  alt="Recipe Generator"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    mb: 2,
                    objectFit: 'cover'
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  RECIPE
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Zoom>

        {/* Grocery Card */}
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Card sx={{ 
            width: 200, 
            borderRadius: 4,
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 6
            }
          }}>
            <CardActionArea component={Link} to="/grocery">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box
                  component="img"
                  src={groceryIcon}
                  alt="Grocery Generator"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    mb: 2,
                    objectFit: 'cover'
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  GROCERY LIST
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Zoom>

        {/* History Card */}
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Card sx={{ 
            width: 200, 
            borderRadius: 4,
            boxShadow: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 6
            }
          }}>
            <CardActionArea component={Link} to="/history">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box
                  component="img"
                  src={historyIcon}
                  alt="History"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    mb: 2,
                    objectFit: 'cover'
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  HISTORY
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Zoom>
      </Stack>
    </Box>
  </Box>
);

export default Home;