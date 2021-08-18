import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getOrderByAlphabetical } from '../../actions/index';

import './OrderByAlphabetical.css';

function OrderByAlphabetical({ dogs, getOrderByAlphabetical }) {

  const [tipo, setTipo] = useState('ascendente');

  function changeTipo() {
    if (tipo === 'ascendente') setTipo('descendente')
    if (tipo === 'descendente') setTipo('ascendente')
  }

  useEffect(() => {
    if (tipo === 'ascendente') {
      getOrderByAlphabetical(tipo)
    }
    if (tipo === 'descendente') {
      getOrderByAlphabetical(tipo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo])

  return (
    <div className='order-alpha'>
      <h2 className='order-alpha__title'>Ordena alfabeticamente</h2>
      <button className='order-alpha__button' onClick={changeTipo}>
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
    getOrderByAlphabetical: event => dispatch(getOrderByAlphabetical(event))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderByAlphabetical);