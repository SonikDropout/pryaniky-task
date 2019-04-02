const initState = {
  page: 0,
  rowsPerPage: 10
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_ROWS_PER_PAGE':
      return {
        ...state,
        rowsPerPage: action.rowsPerPage
      }
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.newPage
      }
    default:
      return state
  }
}