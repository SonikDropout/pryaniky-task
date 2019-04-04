import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Edit } from '@material-ui/icons'
import { getProducts } from '../../store/actions/productsActions'
import ProductsTableToolbar from './ProductsTableToolbar'
import ProductsTableHead from './ProductsTableHead'


function sortProducts(products, order, orderBy) {
  // in case there is nothing to sort
  if (products.length === 0) return products

  const orderByType = typeof (products[0][orderBy])
  if (orderByType === 'string') {
    return products.sort((a, b) => (
      order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : - a[orderBy].localeCompare(b[orderBy])
    ))
  } else if (orderByType === 'Number') {
    return products.sort((a, b) => (
      order === 'asc'
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy]
    ))
  }
}


const styles = {
  root: {
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
  },
  table: {
    minWidth: 768,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  message: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1rem',
  }
};


function ProductsTable(props) {
  const {
    page, setPage,
    rowsPerPage, setRowsPerPage,
    products, getProducts, productsStatus,
    selected, selectProduct, deselectProduct,
    setEditing,
    order, orderBy,
    classes
  } = props;

  useEffect(() => {
    getProducts()
  }, [])

  const handleSelect = (id) => {
    selected.indexOf(id) === -1
      ? selectProduct(id)
      : deselectProduct(id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  const rederRows = () => {
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

  return (
    <Paper className={classes.root}>
      <ProductsTableToolbar />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <ProductsTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            rowCount={products.length}
          />
          <TableBody>
            {rederRows()}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  productsStatus: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  getProducts: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  deselectProduct: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  productsStatus: state.apiMessages.fetchProducts,
  page: state.pagination.page,
  rowsPerPage: state.pagination.rowsPerPage,
  selected: state.selected,
  order: state.sort.order,
  orderBy: state.sort.orderBy,
})

const mapDispatchToPros = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  setPage: (newPage) => dispatch({ type: 'CHANGE_PAGE', newPage }),
  setRowsPerPage: (rowsPerPage) => dispatch({ type: 'SET_ROWS_PER_PAGE', rowsPerPage }),
  selectProduct: (id) => dispatch({ type: 'SELECT_PRODUCT', id }),
  deselectProduct: (id) => dispatch({ type: 'DESELECT_PRODUCT', id }),
  setEditing: (id) => dispatch({ type: 'EDIT_PRODUCT', id })
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToPros)(ProductsTable))