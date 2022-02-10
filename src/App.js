import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Meme from './components/Meme';
import { fabric } from 'fabric';

export default function App() {
  const [canvas, setCanvas] = useState('');

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      backgroundColor: 'purple',
    });

  return (
    <div className='container'>
      <Header />
      <main className='main'>
        {/* <Meme /> */}
        <canvas id='canvas'></canvas>
      </main>
    </div>
  );
}
