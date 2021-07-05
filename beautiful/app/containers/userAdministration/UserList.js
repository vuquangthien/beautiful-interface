/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React from 'react';
import CustomTable from 'components/CustomTable';

// Demo data
const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 4, col1: 'Hello', col2: 'World' },
  { id: 5, col1: 'XGrid', col2: 'is Awesome' },
  { id: 6, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 7, col1: 'Hello', col2: 'World' },
  { id: 8, col1: 'XGrid', col2: 'is Awesome' },
  { id: 9, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 10, col1: 'Hello', col2: 'World' },
  { id: 11, col1: 'XGrid', col2: 'is Awesome' },
  { id: 12, col1: 'Material-UI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 160, editable: true },
  { field: 'col2', headerName: 'Column 2', width: 160, editable: true },
];

export default function UserList() {
  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {},
    [rows],
  );

  return (
    <CustomTable
      rows={rows}
      columns={columns}
      onEditCellChangeCommitted={handleEditCellChangeCommitted}
    />
  );
}
