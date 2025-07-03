// src/theme/ThemeContext.tsx
import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo<Theme>(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              // light mode palette overrides
              primary: {
                main: '#388e3c',
              },
            }
          : {
              // dark mode palette overrides
              primary: {
                main: '#90caf9',
              },
              background: {
                default: '#121212',
                paper: '#1e1e1e',
              },
            }),
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);