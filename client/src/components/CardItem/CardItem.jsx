import React from 'react'
import { Link } from 'react-router-dom';
import './CardItem.css';

import defaultImg from '../../assets/static/jamie-street-MoDcnVRN5JU-unsplash.jpg';

export default function CardItem(props) {

  const { id, name, image, temperament = [] } = props;

  let arrayToString = [];
  if (Array.isArray(temperament)) {
    temperament.map(item => arrayToString.push(item.Nombre));
    var temperamentFinal = arrayToString.join(', ')
  } else {
    temperamentFinal = temperament;
  }

  return (
    <div className='card__item'>

      <img
        className='card__item--img'
        src={(image) ? image : defaultImg}
        onError={(e) => {
          if (e.target.src.includes('undefined')) {
            e.target.onerror = null;
            e.target.src = defaultImg
          } else if (e.target.src.includes('.jpg')) {
            e.target.onerror = null;
            e.target.src = image.replace('jpg', 'png')
          }
        }}
        alt={name}
      />


      <div className='card__item--details'>
        <Link to={`/dogs/${id}`}>
          <p className='card__item--details-name'>{name}</p>
        </Link>
        <div>
          <p className='card__item--details-temperament'>{temperamentFinal}</p>
        </div>
      </div>
    </div>
  )


}
