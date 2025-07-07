import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Alert, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import loadingGif from '../assets/loading.gif';

interface RecipeDisplayProps {
  recipeData: any;
  error: string;
  loading: boolean;
  isCanceling: boolean;
}

const getStyledComponents = (theme: any) => ({
  alertStyle: {
    mb: 3,
    borderRadius: 1,
    boxShadow: theme.shadows[1]
  },
  listContainer: {
    bgcolor: theme.palette.grey[50],
    borderRadius: 1,
    p: 1,
    boxShadow: theme.shadows[1]
  },
  chipStyle: (color: string) => ({
    color: `white`,
    fontWeight: 600,
    bgcolor: theme.palette[color].light,
    px: 1
  }),
  sectionDivider: {
    my: 2,
    borderWidth: 1,
    borderColor: theme.palette.grey[300]
  },
  sectionContainer: {
    p: 2,
    borderRadius: 1,
    boxShadow: theme.shadows[1]
  }
});

const formatRecipe = (data: any, theme: any): React.ReactNode => {
  const styles = getStyledComponents(theme);
  
  if (!data) return null;

  if (data.response?.error) {
    return (
      <>
        <Alert severity="error" sx={styles.alertStyle}>
          {data.response.error}
        </Alert>
        {data.metadata?.ingredients && (
          <>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              color: 'error.main', 
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <span>⚠️</span> Conflicting Ingredients
            </Typography>
            <List dense sx={styles.listContainer}>
              {data.metadata.ingredients.map((item: string, index: number) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={item} 
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
        {data.metadata?.cuisine && (
          <Typography variant="body2" sx={{ 
            mt: 2,
            ...styles.listContainer
          }}>
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              Requested Cuisine:
            </Typography> {data.metadata.cuisine}
          </Typography>
        )}
      </>
    );
  }
  const recipe = data.response || {};
  const metadata = data.metadata || {};

  return (
    <>
      <Typography variant="h4" sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        mb: 2,
        pb: 1,
        borderBottom: `2px solid ${theme.palette.primary.light}`
      }}>
        {recipe.name}
      </Typography>

      {recipe.message && (
        <Alert severity="info" sx={styles.alertStyle}>
          {recipe.message}
        </Alert>
      )}

      <Box sx={{ 
        display: 'flex', 
        gap: 1.5, 
        mb: 3,
        flexWrap: 'wrap'
      }}>
        {recipe.servings && (
          <Chip 
            sx={styles.chipStyle('primary')} 
            label={`🍽️ Servings: ${recipe.servings}`} 
            variant="filled"
            size="medium"
          />
        )}

        {recipe.cooking_time && (
          <Chip 
            sx={styles.chipStyle('primary')} 
            label={`⏱️ Time: ${recipe.cooking_time}m`} 
            variant="filled"
            size="medium"
          />
        )}

        {metadata.cuisine && (
          <Chip 
            sx={styles.chipStyle('primary')} 
            label={`🌍 Country: ${metadata.cuisine}`}
            variant="filled"
            size="medium"
          />
        )}

        {metadata.mealType && (
          <Chip 
            sx={styles.chipStyle('primary')} 
            label={`🍴 Meal Time: ${metadata.mealType}`}
            variant="filled"
            size="medium"
          />
        )}

        {metadata.flavorProfile && (
          <Chip 
            sx={styles.chipStyle('primary')} 
            label={`🌶️ Flavor: ${metadata.flavorProfile}`}
            variant="filled"
            size="medium"
          />
        )}
      </Box>

      <Divider sx={styles.sectionDivider} />

      <Box sx={{ 
        display: 'flex', 
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' }
      }}>

        {/* Ingredients Section */}
        <Box sx={styles.sectionContainer}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main', 
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <span>🥕</span> Ingredients
          </Typography>
          <List dense>
            {(recipe.recipe || []).map((item: string, index: number) => (
              <ListItem key={index} sx={{ 
                py: 0.5,
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}>
                <ListItemText 
                  primary={`• ${item}`} 
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Nutrition Section */}
        <Box sx={styles.sectionContainer}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main', 
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <span>📊</span> Nutrition
          </Typography>
          <List dense>
            {(recipe.nutrition || []).map((item: string, index: number) => (
              <ListItem key={index} sx={{ 
                py: 0.5,
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}>
                <ListItemText 
                  primary={`• ${item}`} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Divider sx={{ ...styles.sectionDivider, my: 3 }} />
      
      {/* Steps Section */}
      <Box sx={styles.sectionContainer}>
        <Typography variant="h6" sx={{ 
          mt: 2, 
          fontWeight: 'bold', 
          color: 'primary.main',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <span>👩‍🍳</span> Steps:
        </Typography>
        <Box component="ol" sx={{ 
          pl: 2,
          '& li': {
            mb: 1.5,
            pl: 1,
          }
        }}>
          {(recipe.steps || []).map((step: string, index: number) => (
            <Box component="li" key={index}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {step}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeData, error, loading, isCanceling }) => {
  const theme = useTheme();

  if (isCanceling) {
    return (
      <Box
        sx={{
          flex: 1,
          height: 400,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={loadingGif}
          alt="Canceling..."
          sx={{ 
            width: 150, 
            height: 150,
            boxShadow: theme.shadows[4]
          }}
          variant="rounded"
        />
        <Typography variant="h6" color="text.secondary">
          Canceling recipe generation...
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          height: 400,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={loadingGif}
          alt="Loading..."
          sx={{ 
            width: 150, 
            height: 150,
            boxShadow: theme.shadows[4]
          }}
          variant="rounded"
        />
        <Typography variant="h6" color="text.secondary">
          Crafting your recipe...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, minHeight: 400 }}>
      {error || recipeData?.response?.error ? (
        <Paper elevation={3} sx={{ 
          p: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[3]
        }}>
          {formatRecipe(recipeData || { response: { error }, metadata: {} }, theme)}
        </Paper>
      ) : recipeData ? (
        <Paper elevation={3} sx={{ 
          p: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[3]
        }}>
          {formatRecipe(recipeData, theme)}
        </Paper>
      ) : (
        <Box sx={{ 
          height: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Typography variant="body1" color="text.secondary">
            Input ingredients to generate a recipe
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDisplay;