import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getOrderByAlWeight } from '../../actions/index';

import './OrderByWeight.css';

function OrderByWeight({ dogs, getOrderByAlWeight }) {

  const [tipo, setTipo] = useState('ascendente');

  function changeTipo() {
    if (tipo === 'ascendente') setTipo('descendente')
    if (tipo === 'descendente') setTipo('ascendente')
  }

  useEffect(() => {
    if (tipo === 'ascendente') {
      getOrderByAlWeight(tipo)
    }
    if (tipo === 'descendente') {
      getOrderByAlWeight(tipo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo])

  return (
    <div className='container'>
      <h2 className='container__title'>Ordena por peso</h2>
      <button className='container__button' onClick={changeTipo}>
        Estas en: {tipo}
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    dogs: state.dogsLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrderByAlWeight: event => dispatch(getOrderByAlWeight(event))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderByWeight);