import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { fabric } from 'fabric';

export default function Meme() {
  const defaultImage = 'http://i.imgflip.com/1bij.jpg';

  const [inputs, setInputs] = useState({
    text: 'Enter your text content',
    url: defaultImage,
  });

  const [mainWidth, mainHeight] = [
    0.7 * window.innerWidth,
    0.7 * window.innerHeight,
  ];

  const [canvas, setCanvas] = useState(
    new fabric.Canvas('canvas', {
      width: mainWidth,
      height: mainHeight,
      preserveObjectStacking: true,
    })
  );
  // initialize canvas
  useEffect(() => {
    setCanvas(
      () =>
        new fabric.Canvas('canvas', {
          width: mainWidth,
          height: mainHeight,
          preserveObjectStacking: true,
        })
    );
  }, [mainWidth, mainHeight]);

  const addImage = (canvi, url) => {
    fabric.Image.fromURL(
      url,
      function (img) {
        const image = img.set({
          selectable: true,
          scaleY: canvi.height / img.height,
          scaleX: canvi.width / img.width,
        });
        canvi.add(image);
        canvi.sendToBack(image);
        canvi.renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const addText = (canvi, textContent) => {
    const text = new fabric.IText(textContent.toUpperCase(), {
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

  const removeObject = () => {
    canvas.remove(canvas.getActiveObject());
  };

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  return (
    <main className='main form-grid'>
      <input
        type='text'
        name='text'
        value={inputs.text}
        onChange={handleChange}
      />
      <button
        className='input-button'
        onClick={() => addText(canvas, inputs.text)}
      >
        Text
      </button>
      <input
        type='text'
        name='url'
        value={inputs.url}
        onChange={handleChange}
      />
      <button
        className='input-button'
        onClick={() => addImage(canvas, inputs.url)}
      >
        Image
      </button>

      <canvas id='canvas' className='canvas'></canvas>

      <div className='button-container'>
        <button className='form-button' onClick={removeObject}>
          Remove
        </button>
        <button className='form-button' onClick={saveImage}>
          Download
        </button>
      </div>
    </main>
  );
}
