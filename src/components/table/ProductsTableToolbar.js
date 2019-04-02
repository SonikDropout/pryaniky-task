import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';


const ProductsTableToolbar = ({ numSelected, addProduct }) => {
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
      <div />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
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
  numSelected: PropTypes.number.isRequired,
  addProduct: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  addProduct: () => dispatch({ type: 'ADD_PRODUCT' })
})


export default connect(null, mapDispatchToProps)(ProductsTableToolbar);