import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Cards from '../Cards/Cards';
import CardItem from '../CardItem/CardItem';
import './Pagination.css'

import { getDogs, getDogsBreed } from '../../actions/index';

function Pagination({ dogsLoaded, getDogs }) {

  const [state, setState] = useState({
    todos: dogsLoaded,
    currentpage: 1,
    todosPerPage: 8
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setState({
      todos: dogsLoaded,
      currentpage: 1,
      todosPerPage: 8
    })
  }, [dogsLoaded])


  const handleClick = (e) => {
    setState({
      ...state,
      currentpage: Number(e.target.id)
    })
  }


  const indexOfLastTodo = (state.currentpage * state.todosPerPage);

  const indexOfFirstTodo = indexOfLastTodo - state.todosPerPage;
  const currentTodos = (state.todos.length > 1) ? state.todos.slice(indexOfFirstTodo, indexOfLastTodo) : state.todos;

  const renderTodos = currentTodos.map((todo, index) => {
    return <li key={index}>{todo}</li>;
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(state.todos.length / state.todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        className='number'
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });


  return (
    <div>
      <Cards>

        {
          renderTodos.map(render => <CardItem id={render.props.children.ID} name={render.props.children.Nombre} image={render.props.children.image} temperament={render.props.children.temperamentos} />)
        }
      </Cards>
      <ul id="page-numbers" className='numbers-page'>
        {renderPageNumbers}
      </ul>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    dogsLoaded: state.dogsLoaded
  };
}

export default connect(mapStateToProps, { getDogs })(Pagination);