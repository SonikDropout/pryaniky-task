import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { deleteProducts } from '../../store/actions/productsActions';


const ProductsTableToolbar = ({ selected, addProduct, deleteSelected }) => {
  const numSelected = selected.length

  return (
    <Toolbar>
      <div>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Products
          </Typography>
          )}
      </div>
      <div style={{ flex: '1 1 100%' }} ></div>
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => deleteSelected(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Add product">
              <IconButton aria-label="Add product" onClick={addProduct}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

ProductsTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  selected: state.selected
})

const mapDispatchToProps = (dispatch) => ({
  addProduct: () => dispatch({ type: 'ADD_PRODUCT' }),
  deleteSelected: (selected) => dispatch(deleteProducts(selected)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProductsTableToolbar);