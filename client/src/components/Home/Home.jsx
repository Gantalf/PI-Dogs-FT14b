import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getDogs } from '../../actions/index';

import './Home.css';
import Loading from '../../assets/static/loading.gif';
import Search from '../Search/Search.jsx';
import Pagination from '../Pagination/Pagination';
import Select from '../Select/Select';
import OrderByAlphabetical from '../OrderByAlphabetical/OrderByAlphabetical';
import OrderByWeight from '../OrderByWeight/OrderByWeight';


function Home({ getDogs }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      await getDogs()
      setLoading(false)
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className='container__loading'>
        <img className='img__loading' src={Loading} alt="loading" />
        <h2>Cargando...</h2>
      </div>
    )
  } else {
    return (
      <div id='container'>
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

      </div >
    )
  }


}



export default connect(null, { getDogs })(Home);