const initState = {
  order: 'asc',
  orderBy: 'name'
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return {
        ...state,
        order: action.newOrder
      }
    case 'SET_ORDER_BY':
      return {
        ...state,
        orderBy: action.newOrderBy
      }
    default:
      return state
  }
}