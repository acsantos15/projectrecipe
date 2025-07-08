import { Switch, FormControlLabel, useTheme, Box } from '@mui/material';
import { useThemeContext } from '../../utils/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export function DarkModeToggle() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();

  const isDark = mode === 'dark';
  const switchThumbColor = isDark ? '#fdd835' : '#388e3c';  
  const switchTrackColor = isDark ? '#fdd83555' : '#388e3c55';  

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
          color: !isDark ? theme.palette.primary.main : theme.palette.text.secondary,
          fontSize: '1.2rem'
        }} 
      />
      <FormControlLabel
        control={
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: switchThumbColor,
              },
              '& .MuiSwitch-track': {
                backgroundColor: switchTrackColor,
                opacity: 1,
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
          color: isDark ? theme.palette.primary.main : theme.palette.text.secondary,
          fontSize: '1.2rem'
        }} 
      />
    </Box>
  );
}
