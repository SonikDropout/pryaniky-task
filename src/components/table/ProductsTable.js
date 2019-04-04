import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TablePagination,
  Paper,
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { getProducts } from '../../store/actions/productsActions'
import ProductsTableToolbar from './ProductsTableToolbar'
import ProductsTableHead from './ProductsTableHead'
import ProductsTableRows from './ProductsTableRows'

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
};


function ProductsTable(props) {
  const {
    page, setPage,
    rowsPerPage, setRowsPerPage,
    productsNum, getProducts,
    classes
  } = props;

  useEffect(() => {
    getProducts()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  }

  return (
    <Paper className={classes.root}>
      <ProductsTableToolbar />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <ProductsTableHead />
          <TableBody>
            <ProductsTableRows />
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={productsNum}
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
  productsNum: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  getProducts: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productsNum: state.products.length,
  page: state.pagination.page,
  rowsPerPage: state.pagination.rowsPerPage,
})

const mapDispatchToPros = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  setPage: (newPage) => dispatch({ type: 'CHANGE_PAGE', newPage }),
  setRowsPerPage: (rowsPerPage) => dispatch({ type: 'SET_ROWS_PER_PAGE', rowsPerPage }),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToPros)(ProductsTable))