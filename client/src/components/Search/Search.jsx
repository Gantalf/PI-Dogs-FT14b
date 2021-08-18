import React, { useState } from 'react'
import { connect } from 'react-redux';


import './Search.css';

import { getDogs } from '../../actions/index';

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
    e.preventDefault();
    async function fetch() {
      if (state.raza[0]) {
        await props.getDogs(state.raza[0]);
      } else {
        await props.getDogs()
      }
    }
    fetch()
  }


  return (
    <div className="main-input">
      <form onSubmit={(e) => handleClick(e)} >
        <h1>Busca tu Raza Favorita</h1>
        <div className="main-input-container">
          <button type="submit" className="search-icon"></button>
          <input onChange={(e) => handleChange(e)} name="raza" value={state.raza} type="text" placeholder="Que raza quieres buscar hoy?" />
        </div>
      </form>

    </div>
  )
}




// function mapDispatchToProps(dispatch) {
//   return {
//     getDogsBreed: name => dispatch(getDogsBreed(name))
//   };
// }

export default connect(null, { getDogs })(Search);