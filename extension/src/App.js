import React from 'react';
import './App.css';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter, Route } from 'react-router-dom';

//import LoginScreen from './components/LoginScreen';
//import Header from './components/Header';
import SignUpScreen from './components/SignupScreen';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway'
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <MemoryRouter>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/dashboard' component={Header} />
          <Route exact path='/signup' component={SignUpScreen} />
        </MemoryRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
