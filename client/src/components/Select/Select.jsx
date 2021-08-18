import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getTemperaments, getFilterForTemperament } from '../../actions/index';

import './Select.css';

function Select({ temperaments, getTemperaments, getFilterForTemperament }) {

  const [state, setState] = useState({
    temperamento: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getFilterForTemperament(state.temperamento);
  }

  //se monta dos, porque? no hay porque.
  useEffect(() => {
    getTemperaments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <form className='select' onSubmit={(e) => handleSubmit(e)}>
      <div className='select__sub'>
        <h2 className='select__sub--title'>Filtra por temperamento</h2>
        <input className='select__input' onChange={(e) => handleChange(e)} name='temperamento' list="temperamentos" />
        <datalist id="temperamentos" >
          {temperaments.map((item, index) => <option key={index} value={item.Nombre}></option>)}
        </datalist>
        <button type="submit">Buscar</button>
      </div>
    </form>
  )
}

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFilterForTemperament: name => dispatch(getFilterForTemperament(name)),
    getTemperaments: () => dispatch(getTemperaments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)