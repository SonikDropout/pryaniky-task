import axios from 'axios';

const apiUrl = 'http://localhost:4000/products';

export const updateProducts = (product) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, product)
      .then(response => {
        dispatch({
          type: 'ADD_PRODUCTS_SUCCESS',
          product: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'ADD_PRODUCTS_ERROR',
          error
        })
      });
  };
};


export const getProducts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch({
          type: 'FETCH_PRODUCTS_SUCCESS',
          products: response.data
        })
        console.log(response.data)
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_PRODUCTS_ERROR',
          error
        })
      });
  };
};

export const deleteProduct = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch({
          type: 'DELETE_PRODUCT_SUCCESS',
        })
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_PRODUCT_ERROR',
          error
        })
      });
  };
};