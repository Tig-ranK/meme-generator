import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    imageUrl: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const rand = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[rand].url;
    setMeme((prevMeme) => ({ ...prevMeme, imageUrl: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className='form'>
        <div className='form-inputs'>
          <input
            type='text'
            placeholder='Top text'
            value={meme.topText}
            name='topText'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Bottom text'
            value={meme.bottomText}
            name='bottomText'
            onChange={handleChange}
          />
        </div>
        <button className='form-button' onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
        <img className='meme-image' src={meme.imageUrl} alt='meme' />
        {/* <a className='form-download' download="download.png" href={meme.imageUrl}>Download</a> */}
      </div>
      <button
        className='form-button'
        onClick={() => saveAs(meme.imageUrl, 'meme.png')}
      >
        Download
      </button>
    </main>
  );
}
