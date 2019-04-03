import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  TableSortLabel,
  TableCell,
  Tooltip,
  Checkbox
} from '@material-ui/core';

const rows = [
  { name: 'name', numeric: false, label: 'Product name' },
  { name: 'price', numeric: true, label: 'Price ($)' },
  { name: 'description', numeric: false, label: 'Description' },
];

function ProductsTableHead(props) {
  const {
    rowCount, productIds,
    numSelected, setSelected,
    order, setOrder,
    orderBy, setOrderBy
  } = props;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(productIds);
    } else {
      setSelected([]);
    }
  }


  const handleRequestSort = (property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
        {rows.map(
          row => (
            <TableCell
              key={row.name}
              sortDirection={orderBy === row.name ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.name}
                  direction={order}
                  onClick={() => handleRequestSort(row.name)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ),
          this,
        )}
        <TableCell>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

ProductsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  productIds: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  numSelected: state.selected.length,
  rowCount: state.products.length,
  productIds: state.products.map(product => product._id),
  order: state.sort.order,
  orderBy: state.sort.orderBy,
})

const mapDispatchToProps = (dispatch) => ({
  setSelected: (newSelected) => dispatch({ type: 'SET_SELECTED', newSelected }),
  setOrder: (newOrder) => dispatch({ type: 'SET_ORDER', newOrder }),
  setOrderBy: (newOrderBy) => dispatch({ type: 'SET_ORDER_BY', newOrderBy }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTableHead);