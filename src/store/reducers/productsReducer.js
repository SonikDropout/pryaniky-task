export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return action.products
    case 'ADD_PRODUCT_SUCCESS':
      return [...state, action.product]
    case 'UPDATE_PRODUCT_SUCCESS':
      return state.map(product => product._id === action.product._id ? action.product : product)
    case 'DELETE_PRODUCTS_SUCCESS':
      return state.filter((product) => action.deleted.indexOf(product._id) === -1)
    default:
      return state
  }
}