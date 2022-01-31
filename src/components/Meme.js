import React from 'react';

const Meme = () => (
  <main>
    <form className='form'>
      <div className="form-inputs">
        <input type='text' placeholder='Shut up' />
        <input type='text' placeholder='and take my money' />
      </div>
      <button className='form-button'>Get a new meme image 🖼️</button>
    </form>
  </main>
);

export default Meme;