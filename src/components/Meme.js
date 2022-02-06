import React from 'react';
import memesData from '../memesData';

const Meme = () => {
  function getMemeImage() {
    const memesArray = memesData.data.memes;
    const rand = Math.floor(Math.random() * 100);
    const url = memesArray[rand].url;
    console.log(url);
  }
  return (
    <main>
      <div className='form'>
        <div className='form-inputs'>
          <input type='text' placeholder='Top text' />
          <input type='text' placeholder='Bottom text' />
        </div>
        <button className='form-button' onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </div>
    </main>
  );
};

export default Meme;
