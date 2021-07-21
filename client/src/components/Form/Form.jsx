import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postNewRaza, getTemperaments, getDogs } from '../../actions/index';
import { Link, Redirect } from 'react-router-dom';
// [ ] Un formulario controlado con los siguientes campos
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro

import './Form.css';


function Form(props) {
  const [state, setState] = useState({
    Nombre: '',
    Altura: '',
    Peso: 0,
    Añosdevida: 0,
    temperamentos: [],
    global: props.dogs
  })

  useEffect(() => {
    props.getTemperaments()
  }, [])

  const handleChange = (e) => {
    console.log(state)
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeCheck = (e) => {
    console.log(state)
    setState({
      ...state,
      temperamentos: [...state.temperamentos, e.target.value]
    })
  }

  const handleClick = () => {
    props.getDogs()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postNewRaza(state);
    window.location = "http://localhost:3000/dogs"
  }

  return (
    <div className='body'>
      <form className='containerF' onSubmit={(e) => handleSubmit(e)}>
        <div className='container__left'>
          <h1 className='container__left--title'>FanDogs</h1>
          <div className='container__left--img'>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png" alt="presentacion" />
          </div>
        </div>
        <div className='container__right'>
          <h1>Si! a crear tu propia raza!</h1>
          <div className='set'>
            <label >
              <span>Nombre</span>
              <input onChange={(e) => handleChange(e)} type="text" name='Nombre' placeholder='Nombre de la nueva raza' required />
            </label>
            <label >
              <span>Altura</span>
              <input onChange={(e) => handleChange(e)} type="text" name='Altura' placeholder='Altura de la nueva raza' required />
            </label>
          </div>
          <div className='set'>
            <label >
              <span>Peso</span>
              <input onChange={(e) => handleChange(e)} type="text" name='Peso' placeholder='Peso de la nueva raza' required />
            </label>
            <label >
              <span>Años</span>
              <input onChange={(e) => handleChange(e)} type="text" name='Añosdevida' placeholder='Años de vida de la nueva raza' required />
            </label>
          </div>


          <ul className='container__temperamentos'>

            {
              props.temperaments.map(item => <li className='set2'>
                <div className='tag'>
                  <input onChange={(e) => handleChangeCheck(e)} type="checkbox" name='temperamentos' value={item.id} /> <label>{item.Nombre}</label>
                </div>
              </li>)
            }

          </ul>


          <div>
            <button type='submit' >Enviar</button>
            <Link to='/dogs'>
              <button className='back'>volver al home</button>
            </Link>

          </div>

        </div>
      </form>
    </div>

  )
}

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
    dogs: state.dogsLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postNewRaza: data => dispatch(postNewRaza(data)),
    getTemperaments: () => dispatch(getTemperaments()),
    getDogs: () => dispatch(getDogs())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)




