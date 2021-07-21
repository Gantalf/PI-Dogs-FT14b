const initialState = {
  dogsLoaded: [],
  dogsRespaldo: [],
  temperaments: [],
  dogDetail: {}
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogsLoaded: action.payload,
        dogsRespaldo: action.payload
      }
    case 'GET_DOGS_BREED':
      return {
        ...state,
        dogsLoaded: action.payload
      }
    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: action.payload
      }
    case 'GET_DOGS_DETAIL':
      return {
        ...state,
        dogDetail: action.payload
      }
    case 'POST_NEW_RAZA':
      return {
        ...state,
        dogsLoaded: state.dogsLoaded.unshift(action.payload)
      }
    case 'GET_FILTER_FOR_TEMPERAMENT':
      let newArray = [...state.dogsRespaldo]
      if (action.payload == '') {
        return {
          ...state,
          dogsLoaded: newArray
        }
      } else {
        return {
          ...state,
          dogsLoaded: newArray.filter((e) => e.temperamentos.includes(action.payload))
        }
      }
    case 'GET_ORDER_BY_ALPHABETICAL':
      console.log('ordenamiento', action.payload)
      let copia = [...state.dogsLoaded];
      if (action.payload == 'ascendente') {
        return {
          ...state,
          dogsLoaded: copia.sort(function (a, b) {
            if (a.Nombre.toUpperCase() > b.Nombre.toUpperCase()) {
              return 1;
            }
            if (a.Nombre.toUpperCase() < b.Nombre.toUpperCase()) {
              return -1;
            }
            return 0;
          })
        }
      } else {
        return {
          ...state,
          dogsLoaded: copia.sort(function (a, b) {
            if (a.Nombre.toUpperCase() > b.Nombre.toUpperCase()) {
              return -1;
            }
            if (a.Nombre.toUpperCase() < b.Nombre.toUpperCase()) {
              return 1;
            }
            return 0;
          })
        }
      }
    case 'GET_ORDER_BY_WEIGHT':
      let respaldo = [...state.dogsLoaded];
      if (action.payload == 'ascendente') {
        return {
          ...state,
          dogsLoaded: respaldo.sort(function (a, b) {
            if (parseInt(a.Peso.split('-')[0]) > parseInt(b.Peso.split('-')[0])) {
              return 1;
            }
            if (parseInt(a.Peso.split('-')[0]) < parseInt(b.Peso.split('-')[0])) {
              return -1;
            }
            return 0;
          })
        }
      } else {
        return {
          ...state,
          dogsLoaded: respaldo.sort(function (a, b) {
            if (parseInt(a.Peso.split('-')[0]) > parseInt(b.Peso.split('-')[0])) {
              return -1;
            }
            if (parseInt(a.Peso.split('-')[0]) < parseInt(b.Peso.split('-')[0])) {
              return 1;
            }
            return 0;
          })
        }
      }
    default:
      return state;
  }
}

export default rootReducer;