import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
// components
import Header from './components/Header';
import Meme from './components/Meme';

export default function App() {
  const defaultImage = 'http://i.imgflip.com/1bij.jpg';
  const [canvas, setCanvas] = useState('');

  // initialize canvas
  useEffect(() => {
    setCanvas(
      () =>
        new fabric.Canvas('canvas', {
          width: 500,
          height: 500,
          backgroundColor: 'lightblue',
          preserveObjectStacking: true,
        })
    );
  }, []);

  const addBackgroundImage = (canvi) => {
    const image = new fabric.Image.fromURL(defaultImage, (img) => {
      img.scale(1);
      img.set('selectable', false);
      canvi.add(img);
      canvi.sendToBack(img);
      canvi.renderAll();
    });
  };
  
  const addText = (canvi) => {
    const text = new fabric.IText('shut up', {
      top: 100,
      left: 100,
      fill: '#fff',
      stroke: '#000',
      strokeWidth: 0.7,
      fontStyle: 'normal',
      fontFamily: 'Impact',
      fontSize: 32,
    });
    canvi.add(text);
    canvi.sendToFront(text);
    canvi.renderAll();
  };

  return (
    <div className='container'>
      <Header />
      <main className='main'>
        {/* <Meme /> */}
        <button onClick={() => addBackgroundImage(canvas)}>Background</button>
        <button onClick={() => addText(canvas)}>Text</button>
        <canvas id='canvas'></canvas>
      </main>
    </div>
  );
}
