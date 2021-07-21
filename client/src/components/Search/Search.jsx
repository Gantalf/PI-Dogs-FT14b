import React, { useState } from 'react'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import './Search.css';

import { getDogsBreed, getDogs } from '../../actions/index';

function Search(props) {

  const [state, setState] = useState({
    raza: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: [e.target.value]
    })
  }

  const handleClick = (e) => {
    console.log(state.raza[0])
    e.preventDefault();
    if (state.raza[0]) {
      props.getDogsBreed(state.raza[0]);
    } else {
      props.getDogs();
    }
  }

  const handleClickSearch = (e) => {
    e.preventDefault();
    props.getDogs();
  }

  return (
    <section className="main-input">
      <form onSubmit={(e) => handleClick(e)} >
        <h1>Busca tu Raza Favorita</h1>
        <div className="main-input-container">
          <button type="submit" className="search-icon"></button>
          <input onChange={(e) => handleChange(e)} name="raza" value={state.raza} type="text" placeholder="Que raza quieres buscar hoy?" />
        </div>
      </form>

    </section>
  )
}



// function mapDispatchToProps(dispatch) {
//   return {
//     getDogsBreed: name => dispatch(getDogsBreed(name))
//   };
// }

export default connect(null, { getDogsBreed, getDogs })(Search);