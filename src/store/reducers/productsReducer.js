export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
    case 'UPDATE_PRODUCTS_SUCCESS':
      return action.products
    default:
      return state
  }
}