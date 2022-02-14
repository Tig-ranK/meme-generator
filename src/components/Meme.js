import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { fabric } from 'fabric';

export default function Meme() {
  const defaultImage = 'http://i.imgflip.com/1bij.jpg';
  const [meme, setMeme] = useState({
    imageUrl: defaultImage,
  });
  const [allMemes, setAllMemes] = useState('');
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [mainWidth, mainHeight] = [500, 500];
  const [canvas, setCanvas] = useState(
    new fabric.Canvas('canvas', {
      width: mainWidth,
      height: mainHeight,
      backgroundColor: 'lightblue',
      preserveObjectStacking: true,
    })
  );
  // initialize canvas
  useEffect(() => {
    console.log('set the canvas');
    setCanvas(
      () =>
        new fabric.Canvas('canvas', {
          width: mainWidth,
          height: mainHeight,
          backgroundColor: 'lightblue',
          preserveObjectStacking: true,
        })
    );
  }, []);

  // useEffect(() => {
  //   window.addEventListener('resize', function fitResponsiveCanvas() {
  //     // canvas dimensions
  //     let canvasSize = {
  //       width: 1200,
  //       height: 700,
  //     };
  //     // canvas container dimensions
  //     let containerSize = {
  //       width: document.getElementById('canvas-container').offsetWidth,
  //       height: document.getElementById('canvas-container').offsetHeight,
  //     };
  //     canvas.setDimensions(containerSize);
  //     // how you want to handle your zoom is really application dependant.
  //     let scaleRatio = Math.min(
  //       containerSize.width / canvasSize.width,
  //       containerSize.height / canvasSize.height
  //     );
  //     canvas.setZoom(scaleRatio);
  //   });
  // }, []);

  // fetching the array of memes
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // picking a random meme out of state
  function getMeme() {
    const rand = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[rand].url;
    setMeme({ imageUrl: url });
  }

  const addBackgroundImage = (canvi, url) => {
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

  const removeObject = () => {
    canvas.remove(canvas.getActiveObject());
  };

  return (
    <main>
      <div className='form'>
        <button className='form-button' onClick={getMeme}>
          Get a new meme image 🖼️
        </button>
      </div>

      <button onClick={() => addBackgroundImage(canvas, meme.imageUrl)}>
        Background
      </button>
      <button onClick={() => addText(canvas)}>Text</button>

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
