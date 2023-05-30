  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import HomePage from './pages/Home/index.jsx';
  import AuthPage from './pages/Auth/index.jsx';
  import ProfilePage from './pages/Profile/index.jsx';
  import ErrorPage from './pages/Error/index.jsx';
  import { useMemo } from 'react';
  import { useSelector } from 'react-redux';
  import { CssBaseline, ThemeProvider } from '@mui/material';
  import { createTheme } from '@mui/material/styles';
  import { themeSettings } from './theme/index.js';


function App() {
  const mode = useSelector( state => state.users.mode )

  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode] )

  const isLogged = useSelector( (state) => state.users.isLogged )

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route
              path='/home' 
              element={isLogged ? <HomePage /> : <Navigate to="/auth" />} 
            />
            <Route
              path='/profile/:userId'
              element={isLogged ? <ProfilePage /> : <Navigate to="/auth" />} 
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

  export default App;
