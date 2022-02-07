import React from 'react';
import Header from './components/Header';
import Meme from './components/Meme';

export default function App() {
  return (
    <div className='container'>
      <Header />
      <main className='main'>
        <Meme />
      </main>

    </div>
  );
};
