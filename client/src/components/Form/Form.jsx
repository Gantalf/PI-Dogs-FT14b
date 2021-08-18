import React, { useState, useEffect } from 'react';
import Multi from 'react-select';
import { connect } from 'react-redux';
import { postNewRaza, getTemperaments, getDogs } from '../../actions/index';
import { Link } from 'react-router-dom';
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
    global: props.dogs,
    image: null
  })

  function handleImage(e) {
    var filesSelected = e.target.files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        setState({
          ...state,
          image: fileLoadedEvent.target.result
        })
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  useEffect(() => {
    props.getTemperaments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeCheck = (e) => {
    let value = [];
    e.map(item => value.push((item.value).toString()))
    console.log(value)
    setState({
      ...state,
      temperamentos: value
    })
  }



  const handleSubmit = (e) => {
    console.log('state', state)
    e.preventDefault();
    props.postNewRaza(state);
    window.location = "http://localhost:3000/dogs"
  }


  let tempOption = [];
  props.temperaments.map(item => tempOption.push({ value: item.id, label: item.Nombre }))


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
          <label className='select__temperament'>
            <span>temperamentos</span>
            <Multi isMulti name='temperamentos' closeMenuOnSelect={false} options={tempOption} onChange={(e) => handleChangeCheck(e)} />
          </label>

          <label className='select__img'>
            <span>Sube una imagen :)</span>
            <input type="file" name="image" id='inputFileToLoad' className="field" onChange={(e) => handleImage(e)} />
          </label>



          {/* <ul className='container__temperamentos'>

            {
              props.temperaments.map((item, index) => <li key={index} className='set2'>
                <div className='tag'>
                  <input onChange={(e) => handleChangeCheck(e)} type="checkbox" name='temperamentos' value={item.id} /> <label>{item.Nombre}</label>
                </div>
              </li>)
            }

          </ul> */}






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




