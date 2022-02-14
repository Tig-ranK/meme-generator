import React from 'react';
import trollface from '../images/trollface.svg';

export default function Header () {
  return (
    <header className='header'>
      <img className='header-icon' src={trollface} alt='trollface' />
      <h2 className='header-logo_text'>Meme Generator</h2>
    </header>
  );
};

