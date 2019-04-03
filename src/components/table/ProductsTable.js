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
import { Edit } from '@material-ui/icons'
import { getProducts } from '../../store/actions/productsActions'
import ProductsTableToolbar from './ProductsTableToolbar'
import ProductsTableHead from './ProductsTableHead'


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


function ProductsTable(props) {
  const {
    page, setPage,
    rowsPerPage, setRowsPerPage,
    products, getProducts,
    selected, selectProduct, deselectProduct,
    setEditing,
    order, orderBy
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <Paper>
      <ProductsTableToolbar />
      <div>
        <Table aria-labelledby="tableTitle">
          <ProductsTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            rowCount={products.length}
          />
          <TableBody>
            {stableSort(products, getSorting(order, orderBy))
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
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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

export default connect(mapStateToProps, mapDispatchToPros)(ProductsTable);