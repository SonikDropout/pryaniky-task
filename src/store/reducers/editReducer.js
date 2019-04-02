export default (state = null, action) => {
  switch (action.type) {
    case 'EDIT_PRODUCT':
      return action.id
    case 'EDIT_PRODUCT_SUCCESS':
      return null
    default:
      return state
  }
}