import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getDogs } from '../../actions/index';

import './Home.css';

import Search from '../Search/Search.jsx';
import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import OrderByAlphabetical from '../OrderByAlphabetical/OrderByAlphabetical';
import OrderByWeight from '../OrderByWeight/OrderByWeight';


function Home({ breed = [], dogs, getDogs }) {

  const [state, setState] = useState({
    actual: dogs
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //getDogs()
  }, [])

  return (
    <section id='container'>
      <Search />
      <div className='container__orders'>
        <Select />
        <OrderByAlphabetical />
        <OrderByWeight />
        <Link to={'/form'}>
          <button className='container__order--button'>Crear Nueva Raza</button>
        </Link>
      </div>
      <div className='container__img'>
        <Pagination />
      </div>

    </section >
  )
}

function mapStateToProps(state) {
  return {
    dogs: state.dogsLoaded,
    breed: state.dogsBreed,
  };
}

export default connect(mapStateToProps, { getDogs })(Home);