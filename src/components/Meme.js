import React, { useState, useEffect } from 'react';
import memesData from '../memesData';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState('');

  function getMemeImage() {
    const memesArray = memesData.data.memes;
    const rand = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[rand].url;
    setMeme((prevMeme) => ({ ...prevMeme, imageUrl: url }));
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  return (
    <main>
      <div className='form'>
        <div className='form-inputs'>
          <input 
            type='text' 
            placeholder='Top text' 
            value={meme.topText}
            name="topText"
            onChange={handleChange}
          />
          <input 
            type='text' 
            placeholder='Bottom text' 
            value={meme.bottomText}
            name="bottomText"
            onChange={handleChange}
          />
        </div>
        <button className='form-button' onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
        <img src={meme.imageUrl} alt="meme" />
      </div>
    </main>
  );
}
