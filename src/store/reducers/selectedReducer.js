export default (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.newSelected
    case 'SELECT_PRODUCT':
      return [...state, action.id]
    case 'DESELECT_PRODUCT':
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}