// src/App.js

import React from 'react';
import './App.css';
import TodoList from './todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import BallAnimation from './ballAnimation';

function App() {
  return (
    <div className="App">
      <BallAnimation />
      <div className="main-content">
        <TodoList />
      </div>
    </div>
  );
}

export default App;

