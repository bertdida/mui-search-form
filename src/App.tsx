import React from 'react';
import * as muiStyles from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { SearchForm } from './SearchForm';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultTheme extends muiStyles.Theme {}
}

const {
  createTheme,
  responsiveFontSizes,
  ThemeProvider: MuiThemeProvider,
} = muiStyles;

const customTheme: muiStyles.ThemeOptions = {
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#202124',
      paper: '#35363A',
    },
  },
};

let theme = createTheme(customTheme);
theme = responsiveFontSizes(theme);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App" style={{ padding: theme.spacing(1) }}>
        <header className="App-header">
          <SearchForm />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
