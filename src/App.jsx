import { FormGroup, FormControlLabel, AppBar, Toolbar, Box, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import MaterialUISwitch from './components/MaterialUISwitch';
import Todo from './components/Todo';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onThemeChange = (_) => setDarkMode(!darkMode);


  return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  List ToDo's
                </Typography>
                <Box style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="caption" component="div" sx={{ flexGrow: 1, px: '8px' }}>
                    {currentTime.toDateString()} {currentTime.toLocaleTimeString()}
                  </Typography>
                  <FormGroup>
                    <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={darkMode} onChange={onThemeChange} />} />
                  </FormGroup>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        <Todo />
      </ThemeProvider>

  );
}

export default App;
