import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/index.jsx';
import LoginPage from './pages/Login/index.jsx';
import RegisterPage from './pages/Register/index.jsx';
import ProfilePage from './pages/Profile/index.jsx';
import ErrorPage from './pages/Error/index.jsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme/index.js';


function App() {

  // GET MODE IN REDUX USERS STATE
  const mode = useSelector( state => state.users.mode )

  // CREATE MUI THEME WITH REACT USEMEMO
  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode] )

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
