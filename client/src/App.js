import './App.css';
import React from 'react';

import Home from './components/Home/Home.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import DogsDetail from './components/DogsDetail/DogsDetail';

import { Route } from 'react-router-dom';
import Form from './components/Form/Form';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Welcome} />
      <Route exact path="/dogs" component={Home} />
      <Route exact path="/dogs/:id" component={DogsDetail} />
      <Route exact path="/form" component={Form} />
    </div>
  );
}

export default App;
