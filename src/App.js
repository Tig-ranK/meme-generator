import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Meme from './components/Meme';
import { fabric } from 'fabric';

export default function App() {
  // states
  const [canvas, setCanvas] = useState('');
  const [rect, setRect] = useState(
    new fabric.Rect({
      height: 100,
      width: 100,
      fill: `#ff7f00`,
    })
  );
  // initiating the canvas
  useEffect(() => {
    setCanvas(
      () =>
        new fabric.Canvas('canvas', {
          width: 500,
          height: 500,
          backgroundColor: 'lightblue',
        })
    );
  }, []);
  // failed attempt at resize observer
  useEffect(() => {
    console.log('rect changed');
  }, [rect.getScaledWidth]);

  const addRect = (canvi) => {
    canvi.add(rect);
    canvi.renderAll();
  };

  const addImage = (canvi) => {
    const image = new fabric.Image.fromURL(
      'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
      (img) => {
        img.scale(0.1);
        canvi.add(img);
        canvi.renderAll();
      }
    );
  };

  const addText = canvi => {
    const text = new fabric.Text("text", {
      top: 100,
      left: 100
    })
    canvi.add(text)
    canvi.renderAll()
  }
  return (
    <div className='container'>
      <Header />
      <main className='main'>
        {/* <Meme /> */}
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <button onClick={() => addImage(canvas)}>Image</button>
        <button onClick={() => addText(canvas)}>Text</button>
        <canvas id='canvas'></canvas>
      </main>
    </div>
  );
}
