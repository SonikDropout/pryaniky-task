export default (state = false, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
    case 'EDIT_PRODUCT':
      return true
    case 'UPDATE_PRODUCTS_SUCCESS':
    case 'CLOSE_DIALOG':
      return false
    default:
      return state
  }
}