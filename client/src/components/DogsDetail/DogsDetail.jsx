import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDogDetail } from '../../actions/index';
import { Link } from 'react-router-dom';

import './DogsDetail.css';

function DogsDetail(props) {
  console.log('details', props)
  const { dogDetail } = props;

  useEffect(() => {
    props.getDogDetail(props.match.params.id)
  }, []);

  return (
    <div className='card__itemD'>
      <img className='card__item--imgD' srcSet={`https://cdn2.thedogapi.com/images/${dogDetail.image}.jpg`} alt={dogDetail.name} />
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