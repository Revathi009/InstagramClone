import './App.css';
import React from 'react'
import NavBar from './components/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/screens/Home';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import SignIn from './components/screens/SignIn';


function App(){
  return(
    <BrowserRouter>
    <NavBar/>

    <Routes>
      <Route exact path="/" element={<Home/>}>
      </Route>

      <Route path ="/signin" element={<SignIn/>}>
      </Route>

      <Route path ="/signup" element={<Signup/>}>
      </Route>

      <Route path ="/profile" element={<Profile/>}>
      </Route>
    </Routes>

    </BrowserRouter>
  );
}

export default App;
