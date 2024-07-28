import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import AddDataForm from './components/AddDataForm';
import DisplayData from './components/DisplayData';
import Signup from './components/Signup';
import Login from './components/Login';
import Chat from './components/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logOut } from './auth';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              My Messaging App
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/add">Add Data</Button>
            <Button color="inherit" component={Link} to="/display">Display Data</Button>
            {!user ? (
              <>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            )}
            <Button color="inherit" component={Link} to="/chat">Chat</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddDataForm />} />
          <Route path="/display" element={<DisplayData />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;