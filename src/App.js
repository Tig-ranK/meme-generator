import React from 'react';
import Header from './components/Header';
import Meme from './components/Meme';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <main className='main'>
        <Meme />
      </main>

    </div>
  );
};

export default App;
