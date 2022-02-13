import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
// components
import Header from './components/Header';
import Meme from './components/Meme';

export default function App() {
  const defaultImage = 'http://i.imgflip.com/1bij.jpg';

  const [canvas, setCanvas] = useState(
    new fabric.Canvas('canvas', {
      width: 500,
      height: 500,
      backgroundColor: 'lightblue',
      preserveObjectStacking: true,
    })
  );

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
    fabric.Image.fromURL(
      defaultImage,
      function (img) {
        const image = img.set({
          selectable: false,
          evented: false,
        });
        canvi.add(image);
        canvi.sendToBack(image);
        canvi.renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const addText = (canvi) => {
    const text = new fabric.IText('shut up'.toUpperCase(), {
      top: 100,
      left: 100,
      fill: '#fff',
      stroke: '#000',
      strokeWidth: 1.5,
      fontStyle: 'normal',
      fontFamily: 'Impact',
      fontSize: 32,
    });
    canvi.add(text);
    // canvi.sendToFront(text);
    canvi.renderAll();
  };

  const saveImage = () => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 1,
    });
    saveAs(dataURL, 'meme.png');
  };

  return (
    <div className='container'>
      <Header />
      <main className='main'>
        <Meme />
        <button onClick={() => addBackgroundImage(canvas)}>Background</button>
        <button onClick={() => addText(canvas)}>Text</button>
        <canvas id='canvas'></canvas>

        <button className='form-button' onClick={saveImage}>
          Download
        </button>
      </main>
    </div>
  );
}
