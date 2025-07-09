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
  useTheme,
  Skeleton
} from '@mui/material';
import loadingGif from '../../assets/loading.gif';

interface RecipeDisplayProps {
  recipeData: any;
  error: string;
  loading: boolean;
  isCanceling: boolean;
}

const formatRecipe = (data: any, theme: any): React.ReactNode => {
  if (!data) return null;

  if (data.response?.error) {
    return (
      <>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 1, boxShadow: theme.shadows[1] }}>
          {data.response.error}
        </Alert>
        {data.metadata?.ingredients && (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: 'error.main', mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <span>⚠️</span> Conflicting Ingredients
            </Typography>
            <List dense sx={{ bgcolor: theme.palette.grey[50], borderRadius: 1, p: 1, boxShadow: theme.shadows[1] }}>
              {data.metadata.ingredients.map((item: string, index: number) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        {data.metadata?.cuisine && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              bgcolor: theme.palette.grey[50],
              borderRadius: 1,
              p: 1,
              boxShadow: theme.shadows[1]
            }}
          >
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              Requested Cuisine:
            </Typography>{' '}
            {data.metadata.cuisine}
          </Typography>
        )}
      </>
    );
  }

  const recipe = data.response || {};
  const metadata = data.metadata || {};

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
          pb: 1,
          borderBottom: `2px solid ${theme.palette.primary.light}`
        }}
      >
        {recipe.name}
      </Typography>

      {recipe.message && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 1, boxShadow: theme.shadows[1] }}>
          {recipe.message}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        {recipe.servings && (
          <Chip
            label={`🍽️ Servings: ${recipe.servings}`}
            variant="filled"
            size="medium"
            sx={{
              color: '#fff',
              fontWeight: 600,
              bgcolor: theme.palette.primary.light,
              px: 1
            }}
          />
        )}

        {recipe.cooking_time && (
          <Chip
            label={`⏱️ Time: ${recipe.cooking_time}m`}
            variant="filled"
            size="medium"
            sx={{
              color: '#fff',
              fontWeight: 600,
              bgcolor: theme.palette.primary.light,
              px: 1
            }}
          />
        )}

        {metadata.cuisine && (
          <Chip
            label={`🌍 Country: ${metadata.cuisine}`}
            variant="filled"
            size="medium"
            sx={{
              color: '#fff',
              fontWeight: 600,
              bgcolor: theme.palette.primary.light,
              px: 1
            }}
          />
        )}

        {metadata.mealType && (
          <Chip
            label={`🍴 Meal Time: ${metadata.mealType}`}
            variant="filled"
            size="medium"
            sx={{
              color: '#fff',
              fontWeight: 600,
              bgcolor: theme.palette.primary.light,
              px: 1
            }}
          />
        )}

        {metadata.flavorProfile && (
          <Chip
            label={`🌶️ Flavor: ${metadata.flavorProfile}`}
            variant="filled"
            size="medium"
            sx={{
              color: '#fff',
              fontWeight: 600,
              bgcolor: theme.palette.primary.light,
              px: 1
            }}
          />
        )}
      </Box>

      <Divider sx={{ my: 2, borderWidth: 1, borderColor: theme.palette.grey[300] }} />

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Ingredients Section */}
        <Box sx={{ p: 2, borderRadius: 1, boxShadow: theme.shadows[1] }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span>🥕</span> Ingredients
          </Typography>
          <List dense>
            {(recipe.recipe || []).map((item: string, index: number) => (
              <ListItem
                key={index}
                sx={{
                  py: 0.5,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Nutrition Section */}
        <Box sx={{ p: 2, borderRadius: 1, boxShadow: theme.shadows[1] }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span>📊</span> Nutrition
          </Typography>
          <List dense>
            {(recipe.nutrition || []).map((item: string, index: number) => (
              <ListItem
                key={index}
                sx={{
                  py: 0.5,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                <ListItemText primary={`• ${item}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderWidth: 1, borderColor: theme.palette.grey[300] }} />

      {/* Steps Section */}
      <Box sx={{ p: 2, borderRadius: 1, boxShadow: theme.shadows[1] }}>
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <span>👩‍🍳</span> Steps:
        </Typography>
        <Box
          component="ol"
          sx={{
            pl: 2,
            '& li': {
              mb: 1.5,
              pl: 1
            }
          }}
        >
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
          gap: 2
        }}
      >
        <Avatar
          src={loadingGif}
          alt="Canceling..."
          sx={{ width: 150, height: 150, boxShadow: theme.shadows[4] }}
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
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: theme.palette.background.default,
          px: 2,
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: 1000,
            minHeight: '100vh',
            borderRadius: 2,
            p: 4,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: theme.shadows[3],
            mx: 'auto'
          }}
        >
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            width="40%"
            height={48}
            sx={{ mb: 3, bgcolor: theme.palette.grey[400] }}
          />

          {/* Chips Skeleton */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rounded"
                width={140}
                height={32}
                sx={{ bgcolor: theme.palette.grey[400] }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Ingredients + Nutrition */}
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
              mb: 4
            }}
          >
            {[...Array(2)].map((_, boxIdx) => (
              <Box key={boxIdx} sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  width="50%"
                  height={30}
                  sx={{ mb: 2, bgcolor: theme.palette.grey[400] }}
                />
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="text"
                    width="100%"
                    height={20}
                    sx={{ mb: 1, bgcolor: theme.palette.grey[300] }}
                  />
                ))}
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Steps */}
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            sx={{ mb: 2, bgcolor: theme.palette.grey[400] }}
          />
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width="100%"
              height={50}
              sx={{ mb: 1.5, borderRadius: 1, bgcolor: theme.palette.grey[300] }}
            />
          ))}

          {/* Loading Overlay (on top of skeleton) */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              backdropFilter: 'blur(1px)', // optional
              backgroundColor: 'rgba(255,255,255,0.05)', // subtle dim effect
              pointerEvents: 'none'
            }}
          >
            <Avatar
              src={loadingGif}
              alt="Loading..."
              sx={{
                width: 150,
                height: 150,
                boxShadow: theme.shadows[5],
                backgroundColor: '#fff', // solid background
                p: 1
              }}
              variant="rounded"
            />
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ mt: 2 }}
            >
              Crafting your recipe...
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, minHeight: 400 }}>
      {error || recipeData?.response?.error ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[3] }}>
          {formatRecipe(recipeData || { response: { error }, metadata: {} }, theme)}
        </Paper>
      ) : recipeData ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: theme.shadows[3] }}>
          {formatRecipe(recipeData, theme)}
        </Paper>
      ) : (
        <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Input ingredients to generate a recipe
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDisplay;
