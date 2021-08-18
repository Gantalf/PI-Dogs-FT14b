import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Welcome.css';

import { getDogs } from '../../actions/index';

function Welcome(props) {

  //hacer useEffect para hacer las peticiones cuando se carga el componente.
  // const handleClick = () => {
  //   props.getDogs();
  //   console.log('handleClick')
  // }

  // useEffect(() => {
  //   props.getDogs()
  // }, []);

  return (
    <div className='welcome'>
      <div className='welcome-content'>
        <h1>Bienvenidos a FanDogs</h1>
        <p className='first'>Busca, conoce y aprende sobre razas.</p>
        <p>O mejor aún, ¡crea la tuya!</p>
        <Link to={'/dogs'}>
          <button >
            Comencemos!
          </button>
        </Link>

      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getDogs: () => dispatch(getDogs())
  };
}

export default connect(null, mapDispatchToProps)(Welcome);