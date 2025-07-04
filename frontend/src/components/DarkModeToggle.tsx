import { Switch, FormControlLabel, useTheme, Box } from '@mui/material';
import { useThemeContext } from '../utils/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export function DarkModeToggle() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        borderRadius: 4,
      }}
    >
      <LightModeIcon 
        sx={{ 
          color: mode === 'light' ? theme.palette.warning.main : theme.palette.text.secondary,
          fontSize: '1.2rem'
        }} 
      />
      <FormControlLabel
        control={
          <Switch
            checked={mode === 'dark'}
            onChange={toggleTheme}
            color={mode === 'dark' ? 'primary' : 'secondary'}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
              },
              '& .MuiSwitch-track': {
                backgroundColor: mode === 'dark' 
                  ? `${theme.palette.primary.light} !important` 
                  : `${theme.palette.secondary.light} !important`,
                opacity: '0.5 !important',
              },
            }}
          />
        }
        label=""
        labelPlacement="start"
        sx={{
          margin: 0,
        }}
      />
      <DarkModeIcon 
        sx={{ 
          color: mode === 'dark' ? theme.palette.primary.main : theme.palette.text.secondary,
          fontSize: '1.2rem'
        }} 
      />
    </Box>
  );
}