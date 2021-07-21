import React from 'react';
import './Cards.css';

export default function Cards({ children }) {
  return (
    <section className='cards'>
      <div className='cards__container'>
        {children}
      </div>
    </section>
  );
}