
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import App from './App';

import { Provider } from 'react-redux';
import store from './store/index';

test('Renderiza el Welcome y muestra Bienvenidos a FanDogs', () => {
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>

  )
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Bienvenidos a FanDogs/i)).toBeInTheDocument()

})

test('Renderiza el Home y muestra Busca tu Raza Favorita', () => {
  const history = createMemoryHistory()
  history.push('/dogs')
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
  expect(screen.getByText(/Busca tu Raza Favorita/i)).toBeInTheDocument()
})