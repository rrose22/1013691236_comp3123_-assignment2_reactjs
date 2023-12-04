// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Employee from './Components/Employee';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Edit from './Components/Edit'
import Add from './Components/Add'
import View from './Components/View';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/login'element={<Login/>}/>
        <Route path='/signup'element={<Signup/>}/>
        <Route path='/'element={<Employee/>}/>
        <Route path='/edit/:id'element={<Edit/>}/>
        <Route path='/add'element={<Add/>}/>
        <Route path='/view/:id' element={<View/>}/>
    </Routes>
    </BrowserRouter>
      
      
  
  );
}

export default App;
