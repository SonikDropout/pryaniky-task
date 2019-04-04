import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Edit } from '@material-ui/icons'
import sortProducts from '../../helpers/sortProducts'

const styles = {
  message: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1rem',
  },
}

function productsTableRows(props) {
  const {
    products, productsStatus,
    order, orderBy,
    classes,
    page, rowsPerPage,
    setEditing,
    selected, selectProduct, deselectProduct
  } = props

  const handleSelect = (id) => {
    selected.indexOf(id) === -1
      ? selectProduct(id)
      : deselectProduct(id)
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  if (productsStatus === 'empty') {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <h4 className={classes.message}>
            No products found in database
            </h4>
        </TableCell>
      </TableRow>
    )
  } else if (productsStatus) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <h4 className={classes.message}>
            Opps... something is wrong with database connection. Try refreshing the page.
            </h4>
        </TableCell>
      </TableRow>
    )
  } else if (!products.length) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <h4 className={classes.message}>
            Loading products...
            </h4>
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      sortProducts(products, order, orderBy)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isItemSelected = isSelected(n._id);
          return (
            <TableRow
              hover
              tabIndex={-1}
              key={n._id}
            >
              <TableCell padding="checkbox">
                <Checkbox onChange={() => handleSelect(n._id)} checked={isItemSelected} title="select product" />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                {n.name}
              </TableCell>
              <TableCell>{n.price}</TableCell>
              <TableCell>{n.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => setEditing(n._id)} title="edit product">
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })
    )
  }
}

productsTableRows.propTypes = {
  products: PropTypes.array.isRequired,
  productsStatus: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectProduct: PropTypes.func.isRequired,
  deselectProduct: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  products: state.products,
  productsStatus: state.apiMessages.fetchProducts,
  selected: state.selected,
  order: state.sort.order,
  orderBy: state.sort.orderBy,
  page: state.pagination.page,
  rowsPerPage: state.pagination.rowsPerPage,
})

const mapDispatchToProps = (dispatch) => ({
  selectProduct: (id) => dispatch({ type: 'SELECT_PRODUCT', id }),
  deselectProduct: (id) => dispatch({ type: 'DESELECT_PRODUCT', id }),
  setEditing: (id) => dispatch({ type: 'EDIT_PRODUCT', id })
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(productsTableRows))
