import React, { useState } from 'react';
import './App.scss';

const App = () => {
  const [state, setState] = useState('CLICK ME');
  return (
    <div className="container">
      <h1>Demo App</h1>
      <button onClick={() => setState('CLICKED')}>{state}</button>
    </div>
  );
};

export default App;
