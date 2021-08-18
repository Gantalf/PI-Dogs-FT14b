import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDogDetail } from '../../actions/index';
import { Link } from 'react-router-dom';

import defaultImg from '../../assets/static/jamie-street-MoDcnVRN5JU-unsplash.jpg';
import Loading from '../../assets/static/loading.gif';
import './DogsDetail.css';

function DogsDetail(props) {

  const [loading, setLoading] = useState(false);

  const { dogDetail } = props;

  useEffect(() => {
    setLoading(true)
    async function fetch() {
      await props.getDogDetail(props.match.params.id)
      setLoading(false)
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let urlImg;
  if (dogDetail.image && dogDetail.image.length < 60) {
    urlImg = `https://cdn2.thedogapi.com/images/${dogDetail.image}.jpg`
  } else if (dogDetail.image) {
    urlImg = dogDetail.image
  } else {
    urlImg = defaultImg;
  }


  if (loading) {
    return (
      <div className='container__loading'>
        <img className='img__loading' src={Loading} alt="loading" />
        <h2>Cargando...</h2>
      </div>
    )
  } else {
    return (
      <div className='card__itemD'>
        <img className='card__item--imgD' src={urlImg}
          onError={(e) => {
            if (e.target.src.includes('undefined')) {
              e.target.onerror = null;
              e.target.src = defaultImg
            } else if (e.target.src.includes('.jpg')) {
              e.target.onerror = null;
              e.target.src = urlImg.replace('jpg', 'png')
            }
          }}
          alt={dogDetail.name} />
        <div className='card__item--detailsD'>
          <p className='card__item--details-nameD'>{dogDetail.name}</p>
          <div className='card__item--subDetails'>
            <p className='card__item--details-temperamentD'>{dogDetail.temperamentos}</p>
            <p className='card__item--details-heightD'> Altura: {dogDetail.height}</p>
            <p className='card__item--details-weightD'>Peso:  {dogDetail.weight}</p>
            <p className='card__item--details-lifeD'>Años de vida: {dogDetail.life_span}</p>
          </div>
          <Link to='/dogs'>
            <button>volver</button>
          </Link>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    dogDetail: state.dogDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDogDetail: (id) => dispatch(getDogDetail(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DogsDetail)