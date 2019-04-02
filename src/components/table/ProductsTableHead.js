import React from 'react';
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
  { id: 'name', numeric: false, label: 'Product name' },
  { id: 'price', numeric: true, label: 'Price ($)' },
  { id: 'description', numeric: false, label: 'Description' },
];

function ProductsTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {rows.map(
          row => (
            <TableCell
              key={row.id}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
}

ProductsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default ProductsTableHead;