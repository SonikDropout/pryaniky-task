import { combineReducers } from 'redux';
import { jsonformsReducer } from '@jsonforms/core';
import dialogReducer from './dialogReducer'
import editReducer from './editReducer'
import productsReducer from './productsReducer'


export default combineReducers({
  jsonforms: jsonformsReducer(),
  isDialogOpen: dialogReducer,
  editingProduct: editReducer,
  products: productsReducer
})