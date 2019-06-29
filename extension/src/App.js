import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <HomeScreen />
    </div>
  );
}

export default App;
