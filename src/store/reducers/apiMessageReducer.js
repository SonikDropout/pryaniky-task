const initState = {
  fetchProducts: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        fetchProducts: action.error.message
      }
    case 'FETCH_PRODUCTS_SUCCESS':
      return action.products.length === 0
        ? { ...state, fetchProducts: 'empty' }
        : state
    default:
      return state
  }
}