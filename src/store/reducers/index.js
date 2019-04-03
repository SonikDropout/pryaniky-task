import { combineReducers } from 'redux';
import { jsonformsReducer } from '@jsonforms/core';
import dialogReducer from './dialogReducer'
import editReducer from './editReducer'
import productsReducer from './productsReducer'
import paginationReducer from './paginationReducer'
import selectedReducer from './selectedReducer'
import sortReducer from './sortReducer'


export default combineReducers({
  jsonforms: jsonformsReducer(),
  isDialogOpen: dialogReducer,
  editedProductId: editReducer,
  products: productsReducer,
  pagination: paginationReducer,
  selected: selectedReducer,
  sort: sortReducer
})