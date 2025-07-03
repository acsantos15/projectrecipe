// src/components/DarkModeToggle.tsx
import { Switch, FormControlLabel, useTheme } from '@mui/material';
import { useThemeContext } from '../utils/ThemeContext';

export function DarkModeToggle() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          color="primary"
        />
      }
      label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
      labelPlacement="start"
      sx={{
        margin: 0, // Adjust as needed
        '& .MuiFormControlLabel-label': {
          color: theme.palette.text.primary,
        }
      }}
    />
  );
}