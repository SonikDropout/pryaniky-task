export default (state = '', action) => {
  switch (action.type) {
    case 'EDIT_PRODUCT':
      return action.id
    case 'EDIT_PRODUCT_SUCCESS':
      return ''
    default:
      return state
  }
}