import axios from 'axios';

const apiUrl = 'http://localhost:4000/products';

export const addProduct = (product) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, product)
      .then(response => {
        dispatch({
          type: 'ADD_PRODUCT_SUCCESS',
          product: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'API_ERROR',
          error
        })
      });
  };
};

export const updateProduct = (id, product) => {
  return (dispatch) => {
    return axios.put(`${apiUrl}/update/${id}`, product)
      .then(response => {
        dispatch({
          type: 'UPDATE_PRODUCT_SUCCESS',
          product: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'API_ERROR',
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
      })
      .catch(error => {
        dispatch({
          type: 'API_ERROR',
          error
        })
      });
  };
};

export const deleteProducts = selectedProducts => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/delete`, selectedProducts)
      .then(response => {
        dispatch({
          type: 'DELETE_PRODUCTS_SUCCESS',
          deleted: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: 'API_ERROR',
          error
        })
      });
  };
};