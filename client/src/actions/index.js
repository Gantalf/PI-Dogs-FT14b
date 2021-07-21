export function getDogs() {
  return function (dispatch) {
    return fetch('http://localhost:3001/dogs')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'GET_DOGS',
          payload: json
        })
      })
      .catch(res => { console.log(res) })
  }
}

export function getDogsBreed(nameBreed) {
  return function (dispatch) {
    console.log(nameBreed)
    return fetch(`http://localhost:3001/dogs?name=${nameBreed}`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'GET_DOGS_BREED',
          payload: json
        })
      })
      .catch(res => { console.log(res) })
  }
}

export function getTemperaments() {
  return function (dispatch) {
    return fetch('http://localhost:3001/temperament')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'GET_TEMPERAMENTS',
          payload: json
        })
      })
      .catch(res => { console.log(res) })
  }
}

export function getDogDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: "GET_DOGS_DETAIL",
          payload: json
        });
      });
  };
}

export function postNewRaza(data) {
  return function (dispatch) {
    return fetch('http://localhost:3001/dog', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'POST_NEW_RAZA',
          payload: json
        })
      })
      .catch(err => console.log(err))
  }
}

export function getFilterForTemperament(name) {
  return {
    type: 'GET_FILTER_FOR_TEMPERAMENT',
    payload: name
  }
}

export function getOrderByAlphabetical(event) {
  return {
    type: 'GET_ORDER_BY_ALPHABETICAL',
    payload: event
  }
}

export function getOrderByAlWeight(event) {
  return {
    type: 'GET_ORDER_BY_WEIGHT',
    payload: event
  }
}