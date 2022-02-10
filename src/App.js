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
      width: 500,
      height: 500,
      backgroundColor: 'purple',
    });

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'yellow',
    });
    canvi.add(rect);
    canvi.renderAll();
  };

  const addImage = (canvi) => {
    const image = new fabric.Image.fromURL(
      'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
      (img) => {
        img.scale(0.1);
        canvas.add(img);
        canvas.renderAll();
      }
    );
  };
  return (
    <div className='container'>
      <Header />
      <main className='main'>
        {/* <Meme /> */}
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <button onClick={() => addImage(canvas)}>Image</button>
        <canvas id='canvas'></canvas>
      </main>
    </div>
  );
}
